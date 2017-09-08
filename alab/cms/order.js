'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const fs = require('hexo-fs');


module.exports = app => {
    class OrderController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.app = ctx.app;
            this.__ = this.ctx.__.bind(this.ctx);
            this.env = this.app.config.env;


        }


        /**
         * 消息处理
         * type:消息类型；
         * 1 text 普通消息（非霸屏）含图片，表情；
         * 2 el 表白
         * 3 redpackid 红包 id
         * 4 bp （paybp）打赏、图片、视频
         */

        * sendmsg() {

            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const body = ctx.request.body;
            const payUrl = '/order/pay/';
            const retOptions = {};
            const types = [
                {
                    name: 'text',
                    message: '',
                }, {
                    name: 'bp',
                    message: '霸屏成功',
                }, {
                    name: 'ds',
                    message: '打赏成功',
                }, {
                    name: 'el',
                    message: '表白成功,2秒后返回',
                }, {
                    name: 'rp',
                    message: '红包发送成功',
                },
            ];
            const isBlack = yield app.redis.get(`black:${bpwall_id}:${ctx.session.user_id}`);
            if (isBlack == 1) {
                retOptions.code = 1;
                retOptions.data = '消息发送失败';
                if (ctx.params.type != 'text') {
                    retOptions.options.message = '消息发送失败';

                    return yield ctx.render('wechat/success.html', retOptions);

                }
                return ctx.body = retOptions;
            }

            const options = {
                bpwall_id: bpwall_id,
                body: body,
                bpwall: yield service.bpwall.get(bpwall_id),
                type: ctx.params.type,
                image: body.image || ctx.query.image,
                admin_bp: body.admin_bp,
                admin_ds: body.admin_ds,
                admin_el: body.admin_el,
                userInfo: yield service.user.info(ctx.session.user_id)

            };
            // 管理员是否可免支付
            options.admin_pay = false;

            const adminInfo = yield service.admin.adminInfo(bpwall_id, ctx.session.user_id);

            // 判断次数是否够用
            if (options.admin_bp == 'on' || options.admin_bp == 1 || options.admin_ds == 1 || options.admin_el == 1 || options.admin_el == 'true') {
                // /const count = yield service.admin.checkAdminCountType(options.bpwall_id, ctx.session.user_id, options.type)
                if (adminInfo) {
                    app.logger.debug('adminInfo:%s', JSON.stringify(adminInfo));
                    options.admin_pay = adminInfo[`admin_${options.type}_times`] > 0;
                }

            }

            // 保存消息
            options.message = yield service.savemsg.message(options);

            if(options.message.get('type') == 'text'){
                if (options.message.get("porn") == false) {

                    return ctx.body = {
                        "code": -2,
                        "data": "\u56fe\u7247\u9274\u5b9a\u4e0d\u5408\u683c\uff0c\u8bf7\u52ff\u4e0a\u4f20\u4e0d\u5065\u5eb7\u76f8\u7247"
                    };
                }

            }else{
                if (options.message.get("porn") == false) {

                    retOptions.code=-2;

                    retOptions.options = {message: "\u56fe\u7247\u9274\u5b9a\u4e0d\u5408\u683c\uff0c\u8bf7\u52ff\u4e0a\u4f20\u4e0d\u5065\u5eb7\u76f8\u7247"};

                    return yield ctx.render('wechat/success.html', retOptions);
                }
            }

            //文本消息直接返回
            if (options.type == 'text') {



                yield service.savemsg.saveMessage(options);
                retOptions.code = 1;
                retOptions.data = '消息发送成功';
                return ctx.body = retOptions;
            }
            //管理员直接返回
            if (options.admin_pay) {

                yield service.savemsg.saveMessage(options);
                yield service.admin.updateCount(options.bpwall_id, ctx.session.user_id, options.type);

                if (options.type != 'text') {

                    retOptions.options = _.find(types, function (chr) {
                        return chr.name == options.type;
                    });

                    if (options.type == 'el') {
                        retOptions.options.url = `${app.config.baseUrl}/app/${options.bpwall_id}`;
                    }
                    return yield ctx.render('wechat/success.html', retOptions);
                }

            }
            //console.log(options)

            if (options.type == 'rp') {
                retOptions.code = 1;
                retOptions.options = {message: '红包发送成功'};
                if (options.body.payWay == 1) {

                    const result = yield service.money.checkUserAmount(options);
                    app.logger.info(result)
                    if (result == true) {
                        let bill = {
                            user_id: ctx.session.user_id,
                            bpwall_id: options.bpwall_id,
                            type: 1,
                            money: options.body.money
                        }
                        yield service.money.createBill(bill)
                        yield service.savemsg.saveMessage(options);
                        yield service.redpack.ready(options.message.get('redpackid'));


                    } else {
                        retOptions.code = 0;
                        retOptions.options = {message: '余额不足'};

                    }
                    app.logger.info(retOptions)

                    //return ctx.body=retOptions
                    return yield ctx.render('wechat/success.html', retOptions);

                }

            }
            //return ctx.body=retOptions

            //生成订单，跳转订单付款页面
            const order = yield service.order.create(options);


            if (order) {

                return ctx.redirect(`${payUrl}?oid=${order.id}`);
            }

            ctx.body = {msg: "异常访问"}


        }

        * pay() {
            const {ctx, service} = this;
            const order_id = ctx.query.oid;
            const options = yield service.order.pay(order_id);
            console.log(options);

            yield ctx.render('wechat/wechat_pay.html', options);


        }

        * success() {

            const id = this.ctx.params.id;
            const ret = {
                code: 1,
                message: '成功支付，你的消息已上墙，请关注',
                url: '/app/' + id,
            };

            yield this.ctx.render('wechat/success.html', {options: ret});

        }

        * notify() {
            const {ctx, service} = this;
            const body = ctx.request.body;
            //console.log(body);
            const message = body;

            app.logger.info(message)


            let order_id = message.out_trade_no;
            order_id = order_id.replace('qahd_', '');
            let attach = {};
            try {
                attach = JSON.parse(message.attach);
            } catch (e) {
            }

            const options = {};
            const orderQuery = new Parse.Query('order');
            orderQuery.equalTo('objectId', order_id);
            orderQuery.include('message')
            const order = yield orderQuery.first().then(function (order) {
                if (order) {
                    if (order.get('is_pay') == 1) {
                        return Parse.Promise.error(`订单${order.id}已付款`);
                    }
                    if (order.get('money') == message.total_fee) {
                        options.order = order;
                        order.set('is_pay', 1);
                        order.set('total_fee', message.total_fee);
                        order.set('notify', message);

                        return order.save();
                    }
                    return Parse.Promise.error(`订单金额不对，应付${order.get('money')},实际为${message.total_fee}`);

                }
                return Parse.Promise.error(`订单${order_id}不存在`);

            }).catch(function (e) {
                app.logger.info(e)
            })
            if (order) {
                const Message = Parse.Object.extend('message');
                const message = new Message();

                message.id = order.get('message').id;
                let data = {
                    bpwall_id: order.get('bpwall_id'),
                    message: yield message.fetch()
                }
                //绑定消息，并发送至大屏
                yield service.savemsg.saveMessage(data)
                if (data.message.get('type') != 'rp') {
                    const task = {
                        name: 'task_order_proccess',
                        order_id,
                    };
                    yield app.redis.rpush('task', JSON.stringify(task));
                }

                if (data.message.get('type') == 'rp') {
                    yield service.redpack.ready(data.message.get('redpackid'));
                }

                //生成财富榜单
                yield app.redis.zincrby(`wb:${order.get('bpwall_id')}:${moment().format('YYYYMMDD')}`, order.get("money"), order.get("user_id"))
                yield app.redis.zincrby(`wb:${order.get('bpwall_id')}`, order.get("money"), order.get("user_id"))

            }

            ctx.body = order ? 'true' : 'false';
        }


    }
    return OrderController;
};
