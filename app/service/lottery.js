'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');
module.exports = app => {
    /**
     * wall Api Service
     */
    class LotteryService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config;
            this.user_id = this.ctx.session.user_id;
        }

        /**
         *
         * @param pageid
         * @returns {*}
         */

        * getResult(pageid) {
            let page = yield this.service.activity.get(pageid);

            function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
            }
            const index=getRandomIntInclusive(0, page.awardList.length - 1)
            let result = page.awardList[index]
            result.index=index+1;
            app.logger.info(result)
            return result;
        }

        * drawsave(options) {

            const Order = Parse.Object.extend('drawResult');
            const order = new Order();

            order.set('userId', options.userInfo.objectId);
            order.set('activityId', options.activityId);
            order.set('nickname', options.userInfo.nickname);
            order.set('draw', options.result);
            order.set('isCheck', 0);
            return yield order.save();

        }


    }

    return LotteryService;
};
