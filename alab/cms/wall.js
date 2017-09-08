'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class WallController extends app.Controller {

        * adminDel() {
            const ctx = this.ctx;
            const bpwall_id = ctx.params.id;
            const tid = ctx.request.body;
            ctx.body = {tid, bpwall: bpwall_id};


        }

        /**
         * 获取礼物及嘉宾
         */
        * getgp() {
            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const options = {
                error: 0,
                guest_list: yield service.bpwall.getGuest(bpwall_id),
                item_list: yield service.bpwall.getPresent(bpwall_id),
            };

            ctx.body = options;


        }

    }
    return WallController;
};
