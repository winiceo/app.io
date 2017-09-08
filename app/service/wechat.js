'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');


module.exports = app => {
    /**
     * SettingService Api Service
     */
    class WechatService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config;
            this.user_id = this.ctx.session.user_id;
            // this.bpwall_id = this.ctx.session.bpwall_id
            this.ctx.app.logger.info(this.ctx.session);
        }

        * getWechatConfig(url) {
            const api = this.ctx.helper.wechatApi();
            const param = {
                debug: false,
                jsApiList: ['checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard',
                    'openAddress'],
                url,
            };
            const promise = new Parse.Promise();

            api.getJsConfig(param, function (err, data) {
                if (err) promise.reject(err);
                promise.resolve(data);
            });
            return yield promise;
        }

        /**
         * 微信客户端首页
         * @param bpwall_id
         * @returns {{bpwall_id: *, user_id: *}}
         */
        * index(bpwall_id) {
            const {ctx, service} = this;
            const options = {
                bpwall_id,
                user_id: this.user_id,
            };
            options.url = this.config.appURL + '/app/' + options.bpwall_id;

            options.setting = yield service.system.getSetting();
            options.bpwall = yield service.bpwall.get(options.bpwall_id);
            options.adminInfo = yield service.admin.adminInfo(bpwall_id, this.ctx.session.user_id);

            options.moneyCount = yield service.money.getCount(this.ctx.session.user_id);
            const user = yield service.user.info(this.ctx.session.user_id);
            if (user) {
                options.user = user;
            }
            options.config = yield this.getWechatConfig(options.url);

            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "霸屏说:有钱也不要太任性哟！",
                "link":options.url
            };
            return options;

        }


    }

    return WechatService;
}
;
