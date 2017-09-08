'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const fs = require('hexo-fs');
const RedPackage = Parse.Object.extend('RedPackage');
module.exports = app => {
    class RedpackController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.app = ctx.app;
            this.__ = this.ctx.__.bind(this.ctx);


        }

        * login() {
            const {ctx, service} = this;

            const ret = {
                "status": 200,
                "data": {
                    "userinfo": {
                        "id": 755,
                        "pid": 78,
                        "username": "test",
                        "email": "",
                        "sex": "3",
                        "status": 1,
                        "create_time": "2017-05-08 08:40:48",
                        "birthday": "1992-11-05",
                        "address": "",
                        "token": "82676b532d8d593aaadd2f066c8d49d4",
                        "access_status": 2,
                        "web_routers": "",
                        "api_routers": "",
                        "default_web_routers": "",
                        "is_update_pass": 1
                    }
                }
            }


            ctx.body = ret;
        }


        * myredpack() {
            const {ctx, service} = this;


            const callbackUrl = app.config.appURL + '/wechat/myredpack';
            const isLogin = yield service.user.checkAuth({url: callbackUrl})

            if (isLogin !== true) {
                return;
            }

            const options = yield {
                userInfo: service.user.info(ctx.session.user_id),
                moneyTotal: app.redis.hget('money', ctx.session.user_id),
                setting: yield service.system.getSetting(),
                config: yield service.wechat.getWechatConfig(callbackUrl)
            };

            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "赚钱不容易，省着点花哟",
                "link": callbackUrl
            };

            const userQuery = new Parse.Query('wechat_user');
            userQuery.equalTo('objectId', ctx.session.user_id);
            yield userQuery.first().then(function (user) {
                if (user) {
                    options.moneyTotal = user.get('money');
                }
            });

            console.log(options.moneyTotal);


            yield ctx.render('wechat/myredpack.html', options);

        }

        * moneyList() {
            const {ctx, service} = this;
            const page = ctx.query.num || 1
            const ret = {
                code: 1,
                data: [],
            };

            const moneys = yield ctx.service.money.getList(ctx.session.user_id, page - 1);
            // console.log(moneys);
            _.each(moneys, function (n) {
                const data = {
                    primary_money: n.get('money') / 100,
                    type: n.get('title'),
                    create_time: ctx.helper.dateAt(n.createdAt),
                    bar_name: n.get('bar_name') || "",
                    style: 'color:rgb(255,136,71)',
                };
                ret.data.push(data);
            });
            if (moneys.length == 0) {
                ret.code = 0
            }
            ctx.body = ret;
        }

        * withdraw() {
            const {ctx, service} = this;

            const callbackUrl = app.config.appURL + '/wechat/money/withdraw';
            const isLogin = yield service.user.checkAuth({url: callbackUrl})

            if (isLogin !== true) {
                return;
            }

            const isCanDo = yield app.redis.hget(`draws`, `${ctx.session.user_id}-${moment().format('YYYYMMDD')}_times`);
            if (isCanDo == 1) {
                const retOptions = {}
                retOptions.code = 1;
                retOptions.message = '每天只能提现一次！';
                return yield ctx.render('wechat/success.html', {options: retOptions});


            }


            const options = {
                setting: yield service.system.getSetting(),
                config: yield service.wechat.getWechatConfig(callbackUrl)


            };

            const userQuery = new Parse.Query('wechat_user');
            userQuery.equalTo('objectId', ctx.session.user_id);
            yield userQuery.first().then(function (user) {
                if (user) {
                    options.user = user;
                }
            });

            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "",
                "link": callbackUrl
            };


            yield ctx.render('wechat/withdraw.html', options);
        }

        * withdrawsave() {
            const {ctx, service} = this;
            const body = ctx.request.body;
            const money = (body.amount);
            const that = this;
            const ret = {
                error: 0,
                amount: money,
                message: '提现成功',
            };

            const bill = {
                type: 3,
                money: body.amount,
                user_id: ctx.session.user_id
            }
            const isCanDo = yield app.redis.hget(`draws`, `${ctx.session.user_id}-${moment().format('YYYYMMDD')}_times`);
            if (isCanDo == 1) {
                ret.message = '提现失败,每天只能提现一次';
                ret.amount = 0;

            } else {
                yield app.redis.hincrby(`draws`, `${ctx.session.user_id}-${moment().format('YYYYMMDD')}_times`, 1);


                let result = yield service.money.createBill(bill)
                if (!result) {
                    ret.message = '提现失败';
                    ret.amount = 0;
                } else {
                    ret.amount = money;
                }
            }

            return ctx.body = ret;

        }


        /**
         * 管理员禁言用户消息
         */
        * black() {

            const {ctx, service} = this;
            const body = ctx.request.body;
            const id = ctx.params.id;
            const uid = body.uid;
            const time = parseInt(body.time);

            const adminInfo = yield service.admin.adminInfo(id, ctx.session.user_id);
            if (adminInfo) {
                let ret;
                if (time > 0) {
                    ret = yield app.redis.setex(`black:${id}:${uid}`, time, 1);
                } else if (time == 0) {
                    console.log('del');
                    ret = yield app.redis.del(`black:${id}:${uid}`);

                } else if (time == -1) {
                    ret = yield service.message.removeByUid(id, uid);
                }

                return ctx.body = {code: 1, data: '操作成功'};
            }
            return ctx.body = {code: 1, data: '无权操作'};

        }


    }

    return RedpackController;
};
