'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
  class talkController extends app.Controller {

    * index() {


      const { ctx, service } = this;
      const bpwall_id = ctx.params.id;
      const loevUrl = app.config.appURL + '/wechat/talk/' + bpwall_id;
      const options = {
        bpwall_id,
        to: ctx.query.sid || body.sid,
        from: ctx.session.user_id,

        pagesize: 20,

        setting: yield service.system.getSetting(),
        bpwall: yield service.bpwall.get(bpwall_id),
        userInfo: yield ctx.service.user.info(ctx.session.user_id),
        config: yield service.wechat.getWechatConfig(loevUrl),
      };

      options.share = {
        "title": options.setting.web_name,
        "imgUrl": app.config.shareimg,
        "desc": "开口说话，机会就在你面前",
        "link":loevUrl
      };

      options.messages = yield ctx.service.talk.message(options);
      if (options.messages.length > 0) {
        options.time = options.messages[0].get('createtime');
        options.maxid = options.messages[0].get('createtime');
      }
            // ctx.body=options


      yield ctx.render('wechat/talk.html', options);
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

      const { ctx, service } = this;
      const bpwall_id = ctx.params.id;
      const body = ctx.request.body;

      const retOptions = {};
      const options = {
        bpwall_id,
        to: body.acceptid,
        from: ctx.session.user_id,
        image: body.imgId,
        content: body.content,
      };

      options.userInfo = yield service.user.info(ctx.session.user_id);


            // 定义msg基本


      let message = {};


      message = yield service.talk.savemsg(options);


      options.message = message;

      retOptions.code = 1;
            // retOptions.data = '消息发送成功'

      ctx.body = retOptions;


            // ctx.body = options
    }

        /**
         * 客户端获取消息
         */
    * getmsg() {

      const { ctx, service } = this;
      const bpwall_id = ctx.params.id;
      const body = ctx.request.body;
      const loevUrl = app.config.appURL + '/wechat/talk/' + bpwall_id;
      const options = {
        bpwall_id,
        to: ctx.query.sid || body.sid,
        from: ctx.session.user_id,
        pagesize: 20,
        maxid: parseInt(body.maxid || ctx.query.maxid),
                //setting: yield service.system.getSetting(),
                //bpwall: yield service.bpwall.get(bpwall_id),
                //userInfo: yield ctx.service.user.info(ctx.session.user_id),
                //config: yield service.wechat.getWechatConfig(loevUrl),
      };
      options.messages = yield ctx.service.talk.message(options);


      if (options.messages.length > 0) {
        options.time = options.messages[0].get('createtime');
        options.maxid = options.messages[0].get('createtime');
      }


      const html = yield ctx.renderView('wechat/talk_getmsg.html', options);
      options.html = html;

      ctx.body = html;


    }

    * unread() {
      const { ctx, service } = this;
      const ret = {
        code: 1,
        data: {
          data: 333,
        },
      };
      ctx.body = ret;

    }
    * clearmsg() {
      const { ctx, service } = this;
      const bpwall_id = ctx.params.id;
      const body = ctx.request.body;

      yield service.talk.clear(body.uid, ctx.session.user_id);
      const ret = { message: '\u804a\u5929\u8bb0\u5f55\u5df2\u7ecf\u88ab\u6e05\u7a7a\uff01', redirect: '', type: 'info' };
      ctx.body = ret;

    }

    }
  return talkController;
};
