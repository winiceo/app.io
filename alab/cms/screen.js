'use strict';
const moment=require("moment")
module.exports = app => {
    class ScreenController extends app.Controller {
        * index() {
            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const setting = yield ctx.service.system.getSetting();
            const bpwall = yield ctx.service.bpwall.get(bpwall_id);

            setting.oss_url = this.config.ossURL;
            setting.oss_video_url = this.config.ossURL + '/static/video';


            yield service.screen.open(bpwall_id);
            yield ctx.render('screen/index.html', {setting, bpwall});


        }

        /**
         * 新版
         */
        * wall() {
            const {ctx, service} = this;
            const bpwall_id = ctx.params.id;
            const setting = yield ctx.service.system.getSetting();
            const bpwall = yield ctx.service.bpwall.get(bpwall_id);

            setting.oss_url = this.config.ossURL;
            setting.oss_video_url = this.config.ossURL + '/static/video/';


            yield service.screen.open(bpwall_id);
            let ver=moment().unix()
            yield ctx.render('screen/newwall.html', {setting, bpwall,ver});


        }

        * close() {
            const bpwall_id = this.ctx.params.id;
            yield this.service.screen.close(bpwall_id);
            const ret = {status: 1, description: '大屏幕已成功关闭！'};
            this.ctx.body = ret;

        }

        * heart() {
            const bpwall_id = this.ctx.params.id;
            yield this.service.screen.open(bpwall_id);
            const ret = {status: 1, description: '大屏幕已成功关闭！'};
            this.ctx.body = ret;

        }


    }
    return ScreenController;
};
