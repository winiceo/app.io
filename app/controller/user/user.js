'use strict';
const Parse = require('../../lib/parse');
const moment = require('moment');
const _ = require('lodash');
const fs = require('hexo-fs');
const RedPackage = Parse.Object.extend('RedPackage');
module.exports = app => {
    class UserController extends app.Controller {

        constructor(ctx) {
            super(ctx);
            this.app = ctx.app;
            this.__ = this.ctx.__.bind(this.ctx);
        }

        * login() {
            const {ctx, service} = this;
            const body = ctx.request.body;

            let Account = Parse.Object.extend("account");

            let ret = {
                code: 200,
                message: ''
            }

            //{"username":"15810042722","password":"123456","agreement":"true","bar_name":"asdfasdf","token":"a53bf09a1ea0aafa2b9e78b4a76f0d77","sms_code":"4234"}
            var query = new Parse.Query("account");
            query.equalTo("username", body.username);
            query.equalTo("password", body.password);


            yield  query.first().then(function (account) {

                if (account) {
                    ctx.session.accountId = account.id
                    ret.message = "登录成功"
                    account.set('role', ['guest']);

                    const token = app.jwt.sign(account, app.config.jwt.secret);

                    account.set('token',token)
                    ctx.session.uid = account.objectId
                    ret.data = account;


                } else {
                    ret.code = 10001
                    ret.message = "登录失败，请检查手机号或者密码是否正确"

                }

            }, function (e) {
                ret.code = 10000
                ret.message = e

            })
            ctx.body = ret;

        }

        * logout() {
            const {ctx, service} = this;

            const ret = {
                "code": 200,
                "message": '',
                "data": {
                    'role': 'admin',
                    "token": '333',
                    "userinfo": {
                        "id": 755,
                        "pid": 78,
                        "username": "test",
                        "email": "",
                        "sex": "3",
                        "status": 1,
                        "create_time": "2017-05-08 08:40:48",
                        "birthday": "1992-11-05",
                        "address": "",
                        "token": "82676b532d8d593aaadd2f066c8d49d4",
                        "access_status": 2,
                        "web_routers": "",
                        "api_routers": "",
                        "default_web_routers": "",
                        "is_update_pass": 1
                    }
                }
            }


            ctx.body = ret;
        }

        * userinfo() {
            const {ctx, service} = this;

            const ret = {
                "code": 200,
                "message": '',
                "data": {
                    'role': 'admin',
                    "token": '333',
                    "name": 'leven',
                    "userinfo": {
                        "id": 755,
                        "pid": 78,
                        "username": "test",
                        "email": "",
                        "sex": "3",
                        "status": 1,
                        "create_time": "2017-05-08 08:40:48",
                        "birthday": "1992-11-05",
                        "address": "",
                        "token": "82676b532d8d593aaadd2f066c8d49d4",
                        "access_status": 2,
                        "web_routers": "",
                        "api_routers": "",
                        "default_web_routers": "",
                        "is_update_pass": 1
                    }
                }
            }


            ctx.body = ret;
        }


        * register() {

            const {ctx, service} = this;
            const body = ctx.request.body;

            const ret = {
                code: 200
            }

            let query = new Parse.Query("account");
            query.equalTo("username", body.username);
            yield query.first().then(function (account) {

                if (!account) {
                    let Account = Parse.Object.extend("account");

                    account = new Account();
                    account.set("username", body.username)
                    account.set("password", body.password)
                    account.set("role", "guest")

                    return account.save()
                } else {
                    return Parse.Promise.error("此手机号已注册");

                }
            }).then(function (account) {


                ctx.session.uid = account.id
                ret.message = "注册成功"


            }, function (error) {

                ret.error = 50001;
                ret.message = error

            }).then(function () {
                "use strict";

            })
            ctx.body = ret;
        }


    }

    return UserController;
};
