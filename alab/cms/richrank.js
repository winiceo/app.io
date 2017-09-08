'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class richrankController extends app.Controller {

        * index() {


            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const loevUrl = app.config.appURL + '/wechat/richrank/' + bpwall_id;
            const options = {

                bpwall_id: bpwall_id,
                setting: yield service.system.getSetting(),
                bpwall: yield service.bpwall.get(bpwall_id),
                userInfo: yield ctx.service.user.info(ctx.session.user_id),
                config: yield service.wechat.getWechatConfig(loevUrl),
            };
            options.share = {
                "title": options.setting.web_name,
                "imgUrl": app.config.shareimg,
                "desc": "榜上有名，才算功成名就",
                "link":loevUrl
            };

            console.log(`wb:${bpwall_id}:${moment().format('YYYYMMDD')}`)
            options.todayUsers = yield app.redis.zrevrange(`wb:${bpwall_id}:${moment().format('YYYYMMDD')}`, 0, 9, 'withscores').then(function (result) {

                // console.log(result)

                let resultUsers = ctx.helper.format_redis_result(result)
                //console.log(resultUsers)
                let promises = [];

                _.forIn(resultUsers, function (value, key) {

                    promises.push(app.redis.hget("users", key));
                });
                return Parse.Promise.when(promises).then(function (users) {

                    return users.map(user=> {
                        if (!_.isEmpty(user)) {
                            user.score = resultUsers[user.objectId]
                            return user;
                        }


                    })


                });
            })

            // options.allUsers = yield app.redis.zrevrange(`wb:${bpwall_id}`, 0, 9, 'withscores').then(function (result) {
            //
            //     // console.log(result)
            //
            //     let resultUsers = ctx.helper.format_redis_result(result)
            //     //console.log(resultUsers)
            //     let promises = [];
            //
            //     _.forIn(resultUsers, function (value, key) {
            //
            //         promises.push(app.redis.hget("users", key));
            //     });
            //     return Parse.Promise.when(promises).then(function (users) {
            //
            //         return users.map(user=> {
            //             user.score = resultUsers[user.objectId]
            //             return user;
            //
            //         })
            //
            //
            //
            //     });
            // })
            //let allUser = yield redis.zrevrange(`wb:${bpwall_id}`, 0, 9, 'withscores').then(function (err, result) {
            //     return ctx.helper.format_redis_result(result)
            // })
            // //const pipeline = app.redis.pipeline();
            // let todayUsers = []
            //
            // let promises = [];
            // // _.each(results, function(result) {
            // //
            // //   // promises.push(result.destroy());
            // // });
            // //
            // _.forIn(todayUser, function (value, key) {
            //     promises.push(yield app.redis.hget("users", key));
            // });
            // yield Parse.Promise.when(promises).then(function (users) {
            //     options.todayUsers = users;
            //
            // });
            //
            //
            // let allUsers = []
            // _.forIn(allUser, function (value, key) {
            //
            //     allUsers.push(yield app.redis.hget("users", key))
            // });
            // //
            // // const result = yield pipeline.exec().then(function (datas) {
            // //
            // // })
            // options.todayUsers = todayUsers
            // options.allUsers = allUsers


            yield ctx.render('wechat/richrank.html', options);


        }

    }
    return richrankController;
};
