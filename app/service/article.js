'use strict';
const _ = require('lodash');
const Parse = require('../lib/parse');
const moment = require('moment');
module.exports = app => {
    /**

     */
    class ArticleService extends app.Service {
        constructor(ctx) {
            super(ctx);

        }

        * get(order_id) {
            const query = new Parse.Query('order');
            query.equalTo('objectId', order_id);

            return yield query.get(order_id);
        }

        * create(options) {


            const Order = Parse.Object.extend('article');
            const order = new Order();
            order.set('title',options.title);


            return yield order.save();
        }

        /**
         * 生成支付页面信息
         * @param order_id
         */
        * pay(order_id) {

            const query = new Parse.Query('order');
            query.equalTo('objectId', order_id);
            const self = this;
            const options = {};
            const orderInfo = yield query.first().then(function (order) {
                options.order = order;
                const data = {
                    body: '北京辉少科技公司',
                    attach: JSON.stringify({oid: order.id}),
                    out_trade_no: 'qahd_' + order.id,
                    total_fee: order.get('money'),
                    spbill_create_ip: '115.29.146.23',
                    openid: order.get('user_openid'),
                    trade_type: 'JSAPI',

                };
                return data;


            }, function (err) {
                return err;
            });

            // app.logger.info("==============")
            // app.logger.info(orderInfo)
            //
            options.config = yield this.ctx.helper.payment().getBrandWCPayRequestParams(
                orderInfo);
            // 妈的不知道微信搞毛啊
            options.config.timeStamp = options.config.timestamp;

            // const promise = new Parse.Promise();
            //
            // this.ctx.helper.payment().getBrandWCPayRequestParams(orderInfo, function(err, payargs) {
            //
            //     console.log(payargs);
            //     console.log(err);
            //     promise.resolve(payargs);
            //
            //
            // });
            // options.config=yield promise;

            // yield self.wechatPay(orderInfo);
            app.logger.info(options);
            return options;


        }


    }

    return ArticleService;
};
