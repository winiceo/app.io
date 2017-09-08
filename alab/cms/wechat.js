'use strict';
const Parse = require('../lib/parse');
const OAuth = require('wechat-oauth');

module.exports = app => {
    class WechatController extends app.Controller {
        /**
         * 微信客户端首页
         */
        * index() {

            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;

            const callbackUrl = app.config.appURL + `/app/${bpwall_id}`;
            const isLogin = yield service.user.checkAuth({url: callbackUrl})

            if (isLogin !== true) {
                return;
            }
            const userInfo = yield service.user.info(ctx.session.user_id);


            yield service.user.fansToWall(bpwall_id, userInfo.objectId)

            const options = yield service.wechat.index(bpwall_id);


            yield ctx.render('wechat/index.html', options);

        }

        /**
         * 微信授权成功后回调处理
         */
        * callback() {

            const {ctx, service} = this;
            const redirectUrl = ctx.query.url;

            const client = new OAuth(app.config.wechat.appid, app.config.wechat.appsecret);


            const promise = new Parse.Promise();
            let wechatUser = null;
            client.getAccessToken(ctx.query.code, function (err, result) {
                if (err || !result.data || !result.data.openid) {
                    return promise.reject(err);
                }
                client.getUser(result.data.openid, function (err, wuser) {
                    if (err) {
                        return promise.reject(err);
                    }
                    wuser.access_token = result.data.access_token;
                    wuser.expires_in = result.data.expires_in;
                    wuser.refresh_token = result.data.refresh_token;
                    wuser.scope = result.data.scope;

                    wechatUser = wuser;
                    promise.resolve();
                });
            });
            const err = yield promise;
            app.logger.error('login: %s', err);

            if (err) {
                ctx.body = err;
            } else {
                yield service.user.processUser(wechatUser);
                ctx.redirect(redirectUrl);


            }


        }

        * message(message) {
            const {ctx, service} = this;

            // const message = app.weixin;
            console.log(message);

            ctx.body = message;


        }


    }
    return WechatController;
};
