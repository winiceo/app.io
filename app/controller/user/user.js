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

                    ret.message = "登录成功"
                    //account.set('role', ['guest','admin']);

                    const token = app.jwt.sign(account, app.config.jwt.secret);

                    account.set('token', token)
                    ctx.session.accountId = account.id
                    ctx.session.uid = account.id
                    ctx.session.team = account.get('team')
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
            ctx.cookies.set('token', null);
            ctx.cookies.set('roles', null);
            ctx.cookies.set('team', null);
            ctx.body = {code: 200, data: {}};
        }

        * userinfo() {
            const {ctx, service} = this;




            ctx.body = ret;
        }


        * register() {

            const {ctx, service} = this;
            const body = ctx.request.body;

            const ret = {
                code: 200
            }
            if (body.captcha !== ctx.session.captcha) {
                ret.code = 50002;
                ret.message = `验证码不正确`
                ctx.body = ret;
            } else {

                let query = new Parse.Query("account");
                const options = {}
                query.equalTo("username", body.username);
                yield query.first().then(function (account) {

                    if (!account) {
                        let Account = Parse.Object.extend("account");

                        account = new Account();
                        account.set("username", body.username)
                        account.set("password", body.password)
                        account.set("roles", ["guest", 'store'])

                        return account.save()
                    } else {
                        return Parse.Promise.error("此用户已存在");

                    }
                }).then(function (account) {
                    options.account = account;
                    ctx.session.uid = account.id
                    ret.message = "注册成功"
                    const Team = Parse.Object.extend('team');
                    const team = new Team();
                    team.set('account', account.id);
                    return team.save();

                }).then(function (team) {
                    options.account.set('team', team.id)
                    return options.account.save()
                }, function (error) {

                    ret.code = 50001;
                    ret.message = error

                }).then(function () {
                    "use strict";
                })

                ctx.body = ret;
            }
        }


    }

    return UserController;
};
