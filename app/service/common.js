'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');
module.exports = app => {

    class CommonService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config;
            this.user_id = this.ctx.session.user_id;
        }
        /**
         * 检测此页面是否需要处理微信登录,获取用户信息
         * @param page
         */
        * checkUserInfo(page){
            const {ctx, service} = this;
            page.cate='activity',
                page.oauth='1',
                page.scope='snsapi_base'

            const callbackUrl = app.config.appURL + `/${page.cate}/${page.objectId}`;
            const isLogin = yield service.wechat.checkAuth({url: callbackUrl, scop: 'snsapi_base'})

            if (isLogin !== true) {
                return;
            }
            const userInfo = yield service.wechat.info(ctx.session.user_id);
            return userInfo;

        }


    }

    return CommonService;
};
