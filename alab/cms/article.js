'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class loveController extends app.Controller {

        * index() {



            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const lover_uid = ctx.query.lover_uid;
            const loevUrl = app.config.appURL + '/wechat/love/' + bpwall_id;
            const options = {
                bpwall_id,
                setting: yield service.system.getSetting(),
                bpwall: yield service.bpwall.get(bpwall_id),
                userInfo: yield service.user.info(ctx.session.user_id),
                config: yield service.wechat.getWechatConfig(loevUrl),
                loves: yield service.bpwall.getLove(bpwall_id),
                loveItem: yield service.bpwall.getLoveItem(bpwall_id),
            };
            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "爱她(他)，就勇敢表白，错过，也许就是一生。",
                "link":loevUrl
            };

            options.adminInfo = yield this.ctx.service.admin.adminInfo(bpwall_id, this.ctx.session.user_id);

            options.moneyCount = yield this.ctx.service.money.getCount(this.ctx.session.user_id);
            // 默认选中第一个
            options.love_item_selected = options.loveItem[0].id;
            if (lover_uid) {
                options.loveUser = yield service.user.info(lover_uid);
            }

            yield ctx.render('wechat/love.html', options);


        }

        * save() {


            const {ctx, service} = this;
            const params = ctx.request.body;
            console.log(params)
            const article = yield service.article.create(params);

            console.log(article)

            const ret = {
                "status": 200,
                "data":  article
            }

            ctx.body = ret;


        }


    }
    return loveController;
};
