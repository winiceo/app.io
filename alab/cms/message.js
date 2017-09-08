'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
  class MessageController extends app.Controller {

        /**
         * 管理员删除消息
         */
    * remove() {

      const { ctx, service } = this;
      const body = ctx.request.body;
      const id = ctx.params.id;
      const tid = body.tid;

      const ret = yield service.message.remove(id, tid);

      app.logger.info({ tid, bpwall: id, ret });

      ctx.body = { success: 1 };
    }
    }
  return MessageController;
};
