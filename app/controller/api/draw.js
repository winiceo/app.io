'use strict';
const Parse = require('../../lib/parse');
const moment = require('moment');
const _ = require('lodash');

const Draw = Parse.Object.extend('drawResult');

//活动管理
//cate 'dzp','zjd'
module.exports = app => {
    class DrawController extends app.Controller {

        * list() {
            const {ctx, service} = this;
            
            const params=ctx.request.query;
            const ret = {
                code:200,
                data:{}
            };
             

            const page = parseInt(params.page) || 1;
            let limit = parseInt(params.limit) || 20;
            const status = parseInt(params.status) ||'';
            const title = parseInt(params.title) || '';

            if(limit>100){
                limit=100;
            }


            // const account = new Account();
            //
            // account.id = ctx.session.accountId;
            // const relation = account.relation('activity');
            // const userQuery = relation.query();

            const query = new Parse.Query(Draw);

            if (status != "") {
                query.equalTo('status', status);
            }


            query.limit(limit);
            query.skip(limit * (page-1));
            query.descending('createdAt');// 先进先出，正序排列


            //app.logge.info(limit)
            yield query.count().then(function (count) {
                ret.data.total = count + 1;
                return query.find();

            }).then(function (items) {

                const temp = [];

                _.forEach(items, function (n, i) {
                    const item = n.toJSON();

                    item.createdAt = ctx.helper.dateAt(n.createdAt, 'YYYY/MM/DD');
                    temp.push(item);
                });

                ret.data.items = temp;
            }, function (error) {

            });

            ctx.body = ret;



        }

        * save() {
            const {ctx, service} = this;
            const body = ctx.request.body;
            const ret = {
                code:200,
                data:{}
            };



            console.log(ctx.session.uid)
            const Activity = Parse.Object.extend('activity');
            const activity = new Activity();


            if (body.objectId) {
                activity.id = body.objectId
                yield app.redis.hdel('activitys', activity.id,function(e,b){
                    console.log([e,b])
                });
            }else{

            }

            activity.set('uid',ctx.session.uid );
            activity.set('status',"draft" );
            activity.set(body);

            ret.data=yield activity.save();
            ctx.body=ret;
        }

        * get(){
            const {ctx, service} = this;
            const activityId = ctx.params.id;
            const ret = {
                code:200,
                data: yield service.activity.get(activityId)
            };
            ctx.body=ret;
        }


    }
    return DrawController;
};
