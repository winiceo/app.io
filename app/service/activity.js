'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');
module.exports = app => {

    class ActivityService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config;
            this.user_id = this.ctx.session.user_id;

        }

        /**
         *获取活动信息
         * @param pageid
         * @returns {*}
         */

        * get(pageid) {
            let page = yield app.redis.hget('activitys', pageid);

            if (!page) {
                app.logger.info('cache:activitys');
                const query = new Parse.Query('activity');
                page = yield query.get(pageid).then(function (page) {
                    if (page) {
                        return page.toJSON();
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });

                yield app.redis.hset('activitys', pageid, page);
            }
            return page;
        }



    }

    return ActivityService;
};
