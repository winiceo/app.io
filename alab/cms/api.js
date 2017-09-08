'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class ApiController extends app.Controller {
        /**
         * 新版
         */
        * newmsg() {

            const {ctx, service} = this;


            const bpwall_id = ctx.params.id;
            const options = {
                bpwall_id: bpwall_id,
                last: parseInt(ctx.query.last) || 0,
                pagesize: parseInt(yield service.bpwall.getItem(bpwall_id, 'show_num')),
                bpwallInfo: yield service.bpwall.get(bpwall_id),
                minid: parseInt(ctx.query.minid),
            };

            // console.log(yield service.bpwall.getItem(bpwall_id, 'show_num'))
            const ret = {}
            const message = yield service.message.newScreenMessage(options);
            // console.log(message)
            const result = _.assign(ret, message);

            ctx.body = result;


        }


        * bpmsg() {

            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const options = {
                bpwall_id: bpwall_id,
                lasttime: parseInt(ctx.query.lasttime) || 0,
                pagesize: parseInt(yield service.bpwall.getItem(bpwall_id, 'show_num')),
                bpwallInfo: yield service.bpwall.get(bpwall_id),
            };

            // console.log(yield service.bpwall.getItem(bpwall_id, 'show_num'))
            const ret = {
                lasttime: moment().unix(),
                isrp: false,
                is_el: false,
                rpList: null,
                rptime: 0,
                isbp: false,
                bp_uid: 0,
                bptime: 10,
                bpEndTime: 0,
                msg: [],
                isds: false,
                bpPicEffect: 'open',
            };

            // ret.delmsg=yield app.redis.lrange(`bpwall:delete:${options.bpwall_id}`, 0, -1);
            ret.is_wall_open = yield service.screen.getStatus(options.bpwall_id);

            const message = yield service.message.screenMessage(options);
            // console.log(message)
            const result = _.assign(ret, message);

            ctx.body = result;


        }

        /**
         * 客户端获取消息
         */
        * getmsg() {

            const {ctx, service} = this;
            const body = ctx.request.body;
            const bpwall_id = ctx.params.id;
            const options = {
                bpwall_id: bpwall_id,
                body: body,
                maxid: parseInt(body.maxid) || 0,
                minid: parseInt(ctx.query.minid) || parseInt(body.minid) || 0,
                pagesize: parseInt(yield this.ctx.service.bpwall.getItem(ctx.params.id, 'show_num')),
                userInfo: yield ctx.service.user.info(ctx.session.user_id),
            };

            options.adminInfo = yield ctx.service.admin.adminInfo(ctx.params.id, ctx.session.user_id);
            if (options.adminInfo) {
                options.isMaster = 1;
            }

            const ret = {

                maxid: 0,
                isOpened: 1,
                list: [],

                data: '',

            };
            ret.isOpened = yield service.screen.getStatus(bpwall_id);

            const message = yield ctx.service.message.clientMessage(options);
            // console.log("====")
            // console.log(options)
            ret.del = message.delmsg;
            ret.maxid = message.maxid;

            if (options.minid > 0) {


                const msgs = [];

                _.forEach(message.list, function (n) {
                    const msg = n.toJSON();
                    msg.id = n.id;
                    // msg.time=ctx.helper.date(msg.createtime)
                    if (msg.type !== 'ds') {
                        msgs.push(msg);
                    }

                });
                if (msgs.length > 0) {
                    ret.time = ctx.helper.date(msgs[0].createtime, 1);
                }
                ret.isMaster = options.isMaster;

                ret.uid = options.userInfo.objectId;
                ret.data = msgs;
            } else {
                if (message.list.length > 0) {
                    ret.list = message.list;
                    const time = ctx.helper.date(message.list[0].get('createtime'), 1);

                    const html = yield ctx.renderView('wechat/message.html', {messages: message.list, time});
                    ret.data = html;
                }
            }

            // ret.options=options


            ctx.body = ret;


        }

        * overbp() {

            const {ctx} = this;
            const body = ctx.request.body;
            const bpwall_id = ctx.params.id;
            const msg_id = body.id || ctx.query.mid;
            const ret = {
                status: 0,
            };
            yield app.redis.lrem(`message:bp:${bpwall_id}`, 0, msg_id);
            const messageQuery = new Parse.Query('message');
            messageQuery.equalTo('objectId', msg_id);
            yield messageQuery.first().then(function (messages) {
                messages.set('is_play', '1');
                return messages.save();

            }).then(function () {
                ret.status = 1;
                ctx.body = ret;

            }, function (error) {
                ret.message = error;

                ctx.body = ret;
            });


        }

        /**
         * 管理员重新霸屏
         */

        * replaypb() {
            const {ctx} = this;
            const body = ctx.request.body;
            const bpwall_id = ctx.params.id;
            const msg_id = body.id;
            const ret = {status: 0, description: '\u4e0d\u5141\u8bb8\u91cd\u590d\u51fa\u73b0\u5728\u5927\u5c4f'};
            // const isAdmin=yield service.bpwall.isAdmin()

            const adminInfo = yield ctx.service.admin.adminInfo(ctx.params.id, ctx.session.user_id);
            if (adminInfo) {

                const messageQuery = new Parse.Query('message');
                messageQuery.equalTo('objectId', msg_id);
                yield messageQuery.first().then(function (messages) {

                    // messages.set("is_play","0")
                    // messages.set("createtime",moment().unix())

                    return messages.save();

                }).then(function (message) {
                    if (message.get('type') !== 'text') {
                        app.redis.rpush(`message:bp:${bpwall_id}`, message.id);
                    }
                    ret.status = 0;
                    ret.description = '重新霸屏成功';


                }, function (error) {
                    ret.status = 1;
                    ret.description = error;

                });
            } else {
                ret.status = 1;
                ret.description = '无权操作';
            }

            ctx.body = ret;
        }

    }
    return ApiController;
};
