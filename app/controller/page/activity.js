'use strict';
const moment=require("moment")
module.exports = app => {
    class ActivityController extends app.Controller {
        * index() {
            const {ctx, service} = this;
            const pageid = ctx.params.id;

            const page = yield ctx.service.page.get(pageid);

            //检测是否需要处理微信用户信息
            const userInfo= yield ctx.service.common.checkUserInfo(page)

            const token = app.jwt.sign({ _uid: 3333 }, app.config.jwt.secret);

            const config={
                cdn:'/public/addons/dzp3',
                page:JSON.stringify(page),
                token:token,
                type:page.awardList.length,
            }
           // var tt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdWlkIjoiMTIzNDU2IiwiaWF0IjoxNTA1MTgyNzE1fQ.-NJ9JTB_CfsWXus_fPnOsm1frFMEAtr7-6quDps0idI';
            //const {_uid}=app.jwt.verify(tt, app.config.jwt.secret)

            //const { _uid } = app.jwt.verify(tt, app.config.jwt.secret);

            //console.log(_uid);
            yield ctx.render('dzp3/index.html', { page,config});


        }




    }
    return ActivityController;
};
