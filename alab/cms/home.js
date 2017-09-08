'use strict';


'use strict';
const Parse = require('../lib/parse');
const moment = require('moment');
const _ = require('lodash');
module.exports = app => {
    class homeController extends app.Controller {

        * list() {
            this.ctx.body = '来了';
        }
        * notFound(){
            this.ctx.status = 404;
            yield this.ctx.render('404.html');
        }
        * error(){

            app.logger.info(this.session)
             //this.ctx.session.user_id=null
            yield this.ctx.render('500.html');
        }

        * resetadmin(){
            const {ctx, service} = this;
            yield service.admin.restAdminsCount();
        }

    }
    return homeController;
};



