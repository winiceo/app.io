'use strict';
const Parse = require('../../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const ret = {
    code:200,
    data:{}
};
const Activity = Parse.Object.extend('activity');

//活动管理
//cate 'dzp','zjd'
module.exports = app => {
    class ActivityController extends app.Controller {

        * list() {
            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const params=ctx.request.query;

            let test={cate:'dzp',
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            }

            const page = parseInt(params.page) || 1;
            let limit = parseInt(params.limit) || 20;
            const cate = parseInt(params.cate) || 'dzp';
            const title = parseInt(params.title) || '';

            if(limit>100){
                limit=100;
            }


            // const account = new Account();
            //
            // account.id = ctx.session.accountId;
            // const relation = account.relation('activity');
            // const userQuery = relation.query();

            const query = new Parse.Query(Activity);

            if (cate != "") {
                query.equalTo('cate', cate);
            }

            console.log(page)
            query.limit(limit);
            query.skip(limit * (page-1));

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

            const Activity = Parse.Object.extend('activity');
            const activity = new Activity();
            activity.set('uid',"" );
            activity.set(body);

            ret.data=yield activity.save();
            ctx.body=ret;


        }


    }
    return ActivityController;
};
