// const Model = require('../../mocks/article/list');
//
// exports.index = function* (ctx) {
//    ctx.body={success:ctx.session};
//    //yield ctx.render('index/index.js', Model.getPage(1, 10));
// };
//
// exports.client = function* (ctx) {
//   yield ctx.renderClient('index/index.js', Model.getPage(1, 10));
// };
//
// exports.element = function* (ctx) {
//   yield ctx.render('element/element.js', Model.getPage(1, 10));
// };
//
// exports.pager = function* (ctx) {
//   const pageIndex = ctx.query.pageIndex;
//   const pageSize = ctx.query.pageSize;
//   ctx.body = Model.getPage(pageIndex, pageSize);
// };
'use strict';


'use strict';

module.exports = app => {
    class homeController extends app.Controller {

        * index() {

             

            const result=  yield app.mysql.get('ims_leven_ds_account', {
                id: 15,
            });
            this.ctx.body = result;
        }

        * test() {
            const params=this.ctx.request.query;

            let result=  yield app.mysql.get('ims_leven_ds_account', {
                id: params['id'],
            });
            if (!result){
                result={no:''}
            }
            console.log(app.wechat)
            this.ctx.body = result;
            // let ret={
            //     stat:0,
            //     pid:33,
            //     msg:333,
            //     type:2
            //
            //
            // }
            // this.ctx.body = ret;
        }
        * notFound(){
            this.ctx.status = 404;
            yield this.ctx.render('page/404.html');
        }
        * error(){

            app.logger.info(this.session)
            //this.ctx.session.user_id=null
            yield this.ctx.render('genv/page/500.html');
        }



    }
    return homeController;
};



