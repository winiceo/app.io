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

        * users() {


            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;

            const page = parseInt(ctx.request.body.page) || 0;
            const type = parseInt(ctx.request.body.type) || 0;

            const options = {
                pagesize: 20,

            };

            const ret = {
                list: [],
            };

            const Bpwall = Parse.Object.extend('bpwall');
            const bpwall = new Bpwall();
            bpwall.id = bpwall_id;
            const relation = bpwall.relation('wechat_user');
            const userQuery = relation.query();

            if (type != 0) {
                userQuery.equalTo('sex', type);
            }


            userQuery.limit(options.pagesize);
            userQuery.skip(options.pagesize * page);


            yield userQuery.count().then(function (count) {
                ret.count = count + 1;
                return userQuery.find();

            }).then(function (users) {

                const temp = [];
                const speical = {
                    uid: 0,
                    nickname: '我的爱人',
                    avatar: 'http://leven-dev.oss-cn-shanghai.aliyuncs.com/static/express_love/images/virtual_lover_avatar_x.png',
                    sex: 'special',
                };
                temp.push(speical);


                _.forEach(users, function (n, i) {
                    const user = n.toJSON();
                    user.uid = user.objectId;
                    user.m_nickname = user.nickname;
                    user.m_avatar = user.headimgurl;
                    user.m_sex = user.sex + '';
                    user.nickname = user.nickname;
                    user.avatar = user.headimgurl;
                    user.sex = user.sex == 1 ? 'male' : 'female';
                    user.present = false;
                    temp.push(user);
                });
                ret.list = temp;
            }, function (error) {

            });

            ctx.body = ret;


        }


    }
    return loveController;
};
