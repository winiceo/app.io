/**
 * Created by leven on 17/2/20.
 */


const wechat = require('co-wechat');
const Parse = require('../lib/parse');

module.exports = (options, app) => {
    // return function* gzip(next) {
    //
    //     yield next;
    //     console.log(335)
    //     wechat("cvmswebapp").middleware(function(){
    //         "use strict";
    //         console.log(3333)
    //         app.weixin=this.weixin
    //     })
    // }

  return wechat('cvmswebapp').middleware(function* () {
    const message = this.weixin;
    const self = this;
    let ret = {
      content: '欢迎来千岸互动',
      type: 'text',
    };
    console.log(message);

    if (message.MsgType == 'event' && (message.Event == 'SCAN' || message.Event == 'subscribe')) {

      if (message.EventKey) {


        const bpwallQuery = new Parse.Query('bpwall');
        const bpwall_id = message.EventKey.replace('qrscene_', '');
        ret = yield bpwallQuery.get(bpwall_id).then(function(wall) {
          'use strict';

          return [{
            title: `欢迎光临${wall.get('wall_title')},点击开始参与互动`,
            description: '豪情霸屏，红包，表白，庆生、婚庆，游戏，尽情嗨起来',
            picurl: 'http://leven-dev.oss-cn-shanghai.aliyuncs.com/static/wall/welcome.gif',
            url: self.app.config.baseUrl + '/app/' + bpwall_id,
          }];


        }, function() {
          'use strict';

          ret = {
            content: '欢迎来千岸互动',
            type: 'text',
          };
          return ret;
        });
      }


    }
    console.log(ret);
    self.body = ret;

  });


};

