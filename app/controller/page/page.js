'use strict';
const moment=require("moment")
module.exports = app => {
    class PageController extends app.Controller {
        * detail() {
            const {ctx, service} = this;
            const pageid = ctx.params.id;

            const page = yield ctx.service.page.get(pageid);
            const config={
                cdn:'/public/addons/dzp1'
            }

            yield ctx.render('dzp1/index.html', { page,config});


        }




    }
    return PageController;
};
