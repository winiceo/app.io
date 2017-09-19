/**
 * Created by leven on 17/4/17.
 */

const Parse = require('../app/lib/parse');

const _ = require('lodash')

const query = new Parse.Query('activity');



let adminQuery = new Parse.Query("admin");




 adminQuery.find().then(function (admins) {
     "use strict";


     admins.map(admin=> {

         if (admin.get("team")) {


             let data = admin.get("team").toJSON();


             console.log(data)
            /// pipeline.hmset(`admin:${admin.get("bpwall").id}:${admin.get('wechatuser').id}`, data);
         }
     })
})
// const Activity = Parse.Object.extend('activity');
// const Award = Parse.Object.extend('award');
// const activity = new Activity();
// var body = {
//
//     name: '234324'
// }
//
// activity.set(body);
//
// var awardList = [{
//
//     "grade": "一等奖",
//     "title": "\b冰箱",
//     "num": "10",
//     "desc": "<p>到店领取</p>"
// }, { "grade": "二等奖", "title": "牛悄", "num": "100", "desc": "<p>13123</p>"}, {
//
//     "grade": "三等奖",
//     "title": "22341234",
//     "num": "111",
//     "desc": "<p>1、不可也其它消费重复使用</p>"
// }, {
//
//     "grade": "四等奖",
//     "title": "234234",
//     "num": "30",
//     "desc": "<p>23423434</p>"
// }];
// const relation = activity.relation('prize');
// const objects = []
// _.each(awardList, function (item) {
//
//     const object = new Award(item);
//     console.log(object.toJSON())
//     object.save().then(function(p){
//         "use strict";
//         console.log(p)
//     },function (e) {
//         console.log(e)
//     });
//     objects.push(object);
//
// });
//
// Parse.Object.saveAll(objects)
//     .then(function (result) {
//         result.map(r => {
//
//             relation.add(r);
//
//         });
//         console.log(result.length);
//         return activity.save();
//
//     }).then(function(a){
//     const query = new Parse.Query('activity');
//     query.equalTo("objectId", a.id);
//     query.include("award");
//     return query.first()
//
//
// }).then(function(a){
//     "use strict";
//     console.log(a.get('award'))
// },function(e){
//         "use strict";
//         console.log(e)
// });
