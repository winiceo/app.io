'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');
module.exports = app => {
    /**
     * wall Api Service
     */
    class BpwallService extends app.Service {
        constructor(ctx) {
            super(ctx);
            this.config = this.ctx.app.config;
            this.user_id = this.ctx.session.user_id;


        }

        /**
         * 获取大屏信息
         * @param bpwall_id
         */

        * get(bpwall_id) {
            let bpwall = yield app.redis.hget('bpwalls', bpwall_id);

            if (!bpwall) {
                app.logger.info('cache:bpwall');
                const bpwallQuery = new Parse.Query('bpwall');
                bpwall = yield bpwallQuery.get(bpwall_id).then(function (bpwall) {
                    if (bpwall) {
                        return bpwall.toJSON();
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });

                yield app.redis.hset('bpwalls', bpwall_id, bpwall);
            }
            return bpwall;
        }

        * getItem(bpwall_id, item) {
            const bpwall = yield this.get(bpwall_id);
            if (bpwall) {
                return bpwall[item] || null;
            }
            return null;

        }


        /**
         * 获取表白场景
         */
        * getLove(bpwall_id) {


            let loves = yield app.redis.hget('loves', bpwall_id);
            if (!loves) {
                app.logger.info('cache:loves');

                const Bpwall = Parse.Object.extend('bpwall');
                const bpwall = new Bpwall();
                bpwall.id = bpwall_id;
                const relation = bpwall.relation('love');
                const query = relation.query();
                query.ascending('sort');


                loves = yield query.find().then(function (loves) {
                    if (loves) {
                        const tmps = [];
                        _.each(loves, function (n) {
                            tmps.push(n.toJSON());
                        });
                        return {loves:tmps};
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });

                yield app.redis.hset('loves', bpwall_id, loves);
            }
            return (loves.loves);


        }

        * getLoveById(bpwall_id, itemId) {
            const guests = yield this.getLove(bpwall_id);
            return _.find(guests, function (chr) {
                return chr.objectId == itemId;
            });
        }


        /**
         * 获取表白场景
         */
        * getLoveItem(bpwall_id) {



            let loveItems = yield app.redis.hget("love_items",bpwall_id);
            if (!loveItems) {
                app.logger.info('cache:loveItems');

                const Bpwall = Parse.Object.extend('bpwall');
                const bpwall = new Bpwall();
                bpwall.id = bpwall_id;
                const relation = bpwall.relation('love_item');
                const query = relation.query();
                query.ascending('fee');


                loveItems = yield query.find().then(function (loveItems) {
                    if (loveItems) {
                        const tmps = [];
                        _.each(loveItems, function (n) {
                            tmps.push(n.toJSON());
                        });
                        return {loveItems:tmps};
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });

                yield app.redis.hset('love_items',bpwall_id, loveItems);
            }
            return loveItems.loveItems;


        }

        * getLoveItemById(bpwall_id, itemId) {
            const guests = yield this.getLoveItem(bpwall_id);
            return _.find(guests, function (chr) {
                return chr.objectId == itemId;
            });
        }


        /**
         * 获取打赏对像
         */
        * getGuest(bpwall_id) {


            let guests = yield app.redis.hget(`guests`, bpwall_id);
            if (!guests) {
                app.logger.info('cache:guests');

                const Bpwall = Parse.Object.extend('bpwall');
                const bpwall = new Bpwall();
                bpwall.id = bpwall_id;
                const relation = bpwall.relation('guest');
                const query = relation.query();
                query.equalTo('is_open', 'true');
                query.ascending('sort');
                const types = ['表演嘉宾', '服务员', '观众'];
                guests = yield query.find().then(function (guests) {
                    if (guests) {
                        const tmps = [];
                        _.each(guests, function (n) {

                            n = n.toJSON();
                            n.type = types[n.type];
                            n.id = n.objectId;
                            tmps.push(n);
                        });
                        return {guests:tmps};
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });

                yield app.redis.hset('guests', bpwall_id, guests);
            }
            return (guests.guests);


        }

        * getGuestById(bpwall_id, itemId) {
            const guests = yield this.getGuest(bpwall_id);
            return _.find(guests, function (chr) {
                return chr.objectId == itemId;
            });
        }

        /**
         * 获取打赏礼品
         */
        * getPresent(bpwall_id) {


            let presents = yield app.redis.hget('presents', bpwall_id);
            if (!presents) {
                app.logger.info('cache:present');

                const Bpwall = Parse.Object.extend('bpwall');
                const bpwall = new Bpwall();
                bpwall.id = bpwall_id;
                const relation = bpwall.relation('present');
                const query = relation.query();
                query.ascending('sort');
                presents = yield query.find().then(function (presents) {
                    if (presents) {
                        const tmps = [];
                        _.each(presents, function (n) {
                            n = n.toJSON();
                            n.id = n.objectId;
                            tmps.push(n);
                        });
                        return {presents:tmps}
                    }
                    return null;

                }, function (err) {
                    app.logger.error(err);
                    return null;
                });
                //console.log(bpwall_id)
                //console.log(presents)
                yield app.redis.hset('presents', bpwall_id, presents);

                //yield app.redis.hset("presents", bpwall_id, presents);
            }
            return (presents.presents);


        }

        /**
         *
         * @param bpwall_id
         * @param itemId
         */
        * getPresentById(bpwall_id, itemId) {
            const presents = yield this.getPresent(bpwall_id);
            return _.find(presents, function (chr) {
                return chr.objectId == itemId;
            });
        }


    }

    return BpwallService;
};
