'use strict';
const moment = require("moment")
module.exports = app => {
    class LotteryController extends app.Controller {
        * awardresult() {
            const {ctx, service} = this;
            const pageid = ctx.params.id;

            const page = yield ctx.service.page.get(pageid);
            ctx.body = [];
        }

        * draw() {
            const {ctx, service} = this;
            const body = ctx.request.body;

            const result=yield ctx.service.lottery.getResult(body.activityid);

            // function getRandomIntInclusive(min, max) {
            //     min = Math.ceil(min);
            //     max = Math.floor(max);
            //     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
            // }

            // var bb = {"num": 29, "error": 0, "rid": getRandomIntInclusive(0, 8)};
            // ;
            // var result = {
            //     "code": "101574",
            //     "nickname": "\u827e\u683c\u739b\u4e0a\u5c31\u4f1a\u683c\u4e0a\u739b\u5c3c\u73af\u4e9a",
            //     "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/2RHdshQKicWCJj6gZ69LyvunRhGrrHaicblCNib0UfOEhiaR09RcFGV5ia9LJWKtUuvrhnW126asohrPZG69ibwdefdQ\/0",
            //     "time": "2017-09-12 16:10:00",
            //     "prompt": "\u6ee1100\u5143\u53ef\u7528",
            //     "plevel": "\u4e00\u7b49\u5956",
            //     "pname": "100\u5143\u73b0\u91d1\u62b5\u7528\u5238",
            //     "num": 24,
            //     "error": 0,
            //     "rid": 0
            // }
            ctx.body = result

        }

        * getresult() {
            const {ctx, service} = this;
            ctx.body = {result: "59b66a560cf2f5887f677013"};

        }



        * saveinfo() {
            const {ctx, service} = this;
            ctx.body = {result: "59b66a560cf2f5887f677013"};

        }


    }

    return LotteryController;
};
