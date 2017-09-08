'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const fs = require('hexo-fs');
const RedPackage = Parse.Object.extend('RedPackage');
module.exports = app => {
    /**
     * 红包相关
     */
    class RedpackController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.app = ctx.app;
            this.__ = this.ctx.__.bind(this.ctx);


        }


        /**
         *  查看大家手气
         */
        * luck() {
            const {ctx, service} = this;
            const id = ctx.request.body.id;
            const options = {};
            //const userInfo = yield ctx.service.user.info(ctx.session.user_id);

            const users = yield app.redis.lrange('redPackages:result:' + id, 0, -1);
            const userList = [];
            _.each(users, function (u) {
                const user = JSON.parse(u);
                userList.push(user);
            });
            options.users = userList;

            yield ctx.render('wechat/redpack_luck.html', options);

        }

        /**
         * 检测是否可用
         */

        * status() {
            // 红包id
            const {ctx, service} = this;
            const id = ctx.request.body.id;
            const userInfo = yield ctx.service.user.info(ctx.session.user_id);

            const userList = yield app.redis.lrange('redPackages:' + id, 0, -1);
            const ret = _.find(userList, function (chr) {
                return chr == userInfo.objectId;
            });
            const options = {
                status: 2,
            };
            if (ret) {
                options.status = 1;
            }


            const redpack = yield service.redpack.get(id);

            options.redpack = redpack;
            const count = yield app.redis.llen('redPackages:' + id);

            if (parseInt(redpack.count) <= parseInt(count)) {
                options.status = 3;
            }
            yield ctx.render('wechat/redpack_status.html', options);

        }

        * rob() {


            const {ctx, service} = this;
            const body = ctx.request.body;
            const id = ctx.query.id || body.id;
            const pipeline = app.redis.pipeline();

            const userInfo = yield ctx.service.user.info(ctx.session.user_id);


            let redPackage;
            pipeline.lrange('redPackages:' + id, 0, -1);
            pipeline.hget('redPackages', id);
            pipeline.llen('redPackages:' + id);

            const result = yield pipeline.exec().then(function (datas) {

                const ret = _.find(datas[0][1], function (chr) {
                    return chr == userInfo.objectId;
                });
                redPackage = (datas[1][1]);

                if (ret) {
                    return Parse.Promise.error({code: 1001, data: '你已经抢过'});

                }


                if (redPackage.count <= datas[2][1]) { // 如果红包数量小于抢红包队列长度，则说明红包已经抢完

                    return Parse.Promise.error({code: 1002, data: '红包没有了哟'});
                }

                return app.redis.rpush('redPackages:' + id, userInfo.objectId);


            }).then(function (newLength) {


                // 即使插入队列成功也不代表抢到红包，因为在上面查询队列长度到添加队列期间可能队列已经被别的请求增加了，
                // 所以根据 Redis 返回的长度判断抢红包是否有效。
                if (redPackage.count < newLength) {

                    return Parse.Promise.as({code: 1002, data: '红包没有了'});
                }

                const rp = redPackage.packages[newLength - 1];


                const data = {
                    uid: userInfo.objectId,
                    nickname: userInfo.nickname,
                    avatar: userInfo.headimgurl,
                    money: rp,
                    redid: id,
                    bpwall_id:redPackage.bpwall_id,
                    createtime: moment().unix(),
                };

                app.redis.rpush('redPackages:result', JSON.stringify(data));
                app.redis.rpush('redPackages:result:' + id, JSON.stringify(data));

                return {code: 1, data: rp};

            }, function (err) {
                app.logger.error(err);
                return err;
            });
            if (result.code == 1002) {
                yield service.redpack.over(id);
            }

            ctx.body = result;
            // yield ctx.render('wechat/redpack_status.html', options);

        }


    }
    return RedpackController;
};
