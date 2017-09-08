'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class loveController extends app.Controller {

        * index() {

            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const loevUrl = app.config.appURL + '/wechat/face/' + bpwall_id;
            const ret = {
                bpwall_id,
                page: parseInt(ctx.request.body.page) || 0,
                type: parseInt(ctx.request.body.type) || 0,
                pagesize: 20,

            };
            const options = {
                bpwall_id,
                setting: yield service.system.getSetting(),
                bpwall: yield service.bpwall.get(bpwall_id),
                userInfo: yield ctx.service.user.info(ctx.session.user_id),
                config: yield service.wechat.getWechatConfig(loevUrl),
                userList: yield service.user.getUserList(ret),
            };

            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "爱她(他)，就勇敢表白，错过，也许就是一生。",
                "link": loevUrl
            };
            // ctx.body=options


            yield ctx.render('wechat/face.html', options);

        }

        * moreuser() {

            const {ctx, service} = this;
            const options = {
                bpwall_id: ctx.params.id,
                page: parseInt(ctx.request.body.page) || 0,
                type: parseInt(ctx.request.body.type) || 0,
                pagesize: 20,
            };


            const ret = yield service.user.getUserList(options);


            ctx.body = yield ctx.renderView('wechat/faceuser.html', ret);
            // yield ctx.render('wechat/face.html', options);


        }

    }
    return loveController;
};
