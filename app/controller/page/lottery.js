'use strict';
const moment = require("moment")
module.exports = app => {
    //抽奖
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
            app.logger.info(body);

            const res=yield ctx.service.lottery.getResult(body.activityid);
            const options={
                activityId:body.activityid,
                result:res,
                userInfo:yield  service.wechat.currentUser()

            }
            console.log(options)
            const result=yield ctx.service.lottery.drawsave(options)


            var ret = {
                "code": result.ObjectId,
                "nickname": options.userInfo.nickname,
                "headimgurl": options.userInfo.headimgurl,
                "time": "2017-09-12 16:10:00",
                "prompt": "\u6ee1100\u5143\u53ef\u7528",
                "plevel": res.grade,
                "pname": res.name,
                "num": 24,
                "error": 0,
                "rid": res.index
            }

            ctx.body = ret

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
