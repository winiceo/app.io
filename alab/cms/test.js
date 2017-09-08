'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const baseUrl = 'http://leven.71an.com';

const Mock = require('mockjs');

const Redis = require('ioredis');
//const redis = new Redis();
module.exports = app => {
    class loveController extends app.Controller {
        * menu() {

            const WechatAPI = require('co-wechat-api');

            const config = this.app.config;


            const api = new WechatAPI(config.wechat.appid, config.wechat.appsecret);
            const menu = {
                button: [
                    {
                        type: 'click',
                        name: '霸屏',
                        key: 'baping',
                    },
                    {

                        type: 'view',

                        url: 'http://leven.71an.com/wechat/myredpack',

                        name: '钱宝',


                    },
                    {

                        type: 'view',

                        url: 'http://mp.weixin.qq.com/s/LYygNlleTczSoOs-7tAyNA',

                        name: '产品介绍',


                    }

                ],
            };

            // console.l
            var result = yield* api.removeMenu();

            var result = yield* api.createMenu(menu);
            result.menu = menu;
            this.ctx.body = result;


        }

        * resetadmin() {
            const {ctx, service} = this;
            yield service.admin.restAdminsCount();
            this.ctx.body ="ok";
        }

        *
        rp_create() {

            const result = yield this.ctx.curl(baseUrl + '/api/sendmsg/' + type + '/' + bpwall_id, {
                // 必须指定 method
                method: 'POST',
                // 通过 contentType 告诉 httpclient 以 JSON 格式发送
                contentType: 'json',
                data,
                // 明确告诉 httpclient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });
            // console.log(result)
            this.ctx.body = result.data;
        }

        *
        getWallId() {
            const query = new Parse.Query('bpwall');
            query.descending('creatAt');
            return yield query.first().then(function (bpwall) {

                return bpwall.id;
            });
        }

        *
        wechat() {
            const {ctx, service} = this;

            // 测试代码
            const session = yield service.test.getSession();
            ctx.session.user_id = session.user_id;
            ctx.session.user_id = session.user_id;


            ctx.redirect('/app/' + ctx.params.id);


        }

        *
        register() {
            const {ctx, service} = this;
            const mobile = Mock.mock({
                'mobile|11': /\d{1}/,
            });
            const data = {
                username: mobile.mobile,
                password: '123456',
                bar_name: '七岸酒吧',
            };
            console.log(data);
            const result = yield this.ctx.curl('http://localhost:4020/account/register', {
                // 必须指定 method
                method: 'POST',
                // 通过 contentType 告诉 httpclient 以 JSON 格式发送
                contentType: 'json',
                data,
                // 明确告诉 httpclient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });
            // console.log(result)
            this.ctx.body = result.data;

        }

        * ok() {
            const {ctx, service} = this;

            // 测试代码
            const session = yield service.test.getRandSession();
            ctx.session.user_id = session.user_id;


            const query = new Parse.Query('wechat_user');
            query.ascending('creatAt');

            const user = yield query.first().then(function (user) {
                return user;
            });
            yield service.user.cache(user);
            this.ctx.body = {
                session: this.ctx.session,
            };


        }

        * ok1() {
            app.on('redpack:1', function (a, b) {
                console.log(a, b);


                //


                // app.event.on('redpack:*', (data, channel) => {
                //     console.log(data, channel)
                //     app.service.redpack.process(channel,data)
                // });
            });
            app.emit('redpack:1', '32423');
            app.event.emit('redpack:1', {name: 'Louis'});

            this.ctx.body = {a: 3};

        }

        * redis() {

            const a = yield app.redis.publish('news', 'adfasdf');

            this.ctx.body = a;
        }

        *
        text() {
            const bpwall_id = yield this.getWallId();
            const {ctx, service} = this;
            const type = ctx.params.type;

            // 先清空message
            const query = new Parse.Query('message');


            yield query.find().then(function (results) {

                const promises = [];
                _.each(results, function (result) {

                    // promises.push(result.destroy());
                });
                return Parse.Promise.when(promises);

            }).then(function () {

            });


            yield service.test.getRandSession();

            // // ctx.session.user_id = "tQlwawDBWr"
            // // ctx.session.user_id = "og54Btzs5Iwp403MVgjCbiDUzru0"
            // //
            // console.log(ctx.session)

            const data = yield service.test.getData(type, bpwall_id);
            console.log(data);
            const result = yield this.ctx.curl(baseUrl + '/api/sendmsg/' + type + '/' + bpwall_id, {
                // 必须指定 method
                method: 'POST',
                // 通过 contentType 告诉 httpclient 以 JSON 格式发送
                contentType: 'json',
                data,
                // 明确告诉 httpclient 以 JSON 格式处理返回的响应 body
                dataType: 'json',
            });
            // console.log(result)
            this.ctx.body = result.data;

        }


    }
    return loveController;
}
;
