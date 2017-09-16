
module.exports = app => {

    const checkWechat = app.middlewares.checkwechat({}, app);

    //const checkid = app.middlewares.checkid({}, app);
    const checksession = app.middlewares.checksession({}, app);
    const xml = app.middlewares.xmlparser({}, app);
    const wechatPayment = app.middlewares.wechatpay({}, app);

    // 处理微信主动通知的消息 appid 不为同公从号，暂未处理
    app.all('/wechat/:appid', checkWechat, 'wechat.wechat.wechat');

    //支付通知
    // app.all('/api/pay/notify', xml, wechatPayment.middleware(), 'order.notify');

    //微信回调
    app.get('/wc/callback', 'wechat.wechat.callback');

    app.get('/captcha','api.common.captcha')

    //oss相关
    app.all('file', '/api/v1/oss/list', 'api.oss.list');
    app.all('/api/v1/oss/sign', '/api/v1/oss/sign', 'api.oss.sign');

    //活动页面处理
    app.get('/activity/:id', app.controller.page.activity.index);

    //文章类页面处理
    app.get('/pages/:id', app.controller.page.page.index);


    //添加核销员
    app.get('/check/manage/join/:id', app.controller.page.check.join);
    app.get('/check/test', app.controller.page.check.test);

    //socket 相关
    // app.io.route('lottery', app.io.controllers.lottery);
    //app.io.of('/').route('lottery', app.io.controllers.lottery);



    //const wechat = app.middlewares.wechat();

     // app.get('/app/:id', 'wechat.wechat.index');

    app.get('/home', app.controller.home.home.index);

    app.get('/test', app.controller.home.home.test);

    app.get('/app/api/article/list', app.controller.app.app.list);
    app.get('/app/api/article/:id', app.controller.app.app.detail);
    app.get('/app(/.+)?', app.controller.app.app.index);

    //用户中心
    app.get('/uc(/.+)?', app.controller.uc.uc.index);


    app.post('/api/v1/user/login', 'user.user.login')
    app.post('/api/v1/user/register', 'user.user.register')
    app.all('/api/v1/user/logout', 'user.user.logout')

    app.all('/api/v1/user/info', 'user.user.userinfo')


    //后台活动api
    app.get('/api/v1/activity/list', 'api.activity.list')
    app.get('/api/v1/activity/get/:id', 'api.activity.get')
    app.post('/api/v1/activity/save', 'api.activity.save')

    //后台核销
    app.get('/api/v1/draw/list', 'api.draw.list')

    //核销管理员
    app.get('/api/v1/check/list', 'api.check.list')
    app.post('/api/v1/check/delete/:id', 'api.check.delete')

    // app.get('/api/v1/activity/get/:id', 'api.activity.get')
    // app.post('/api/v1/activity/save', 'api.activity.save')






    //我的奖品
    app.post('/lottery/user/awardresult', app.controller.page.lottery.awardresult);
    app.post('/lottery/getresult', app.controller.page.lottery.getresult);
    app.post('/lottery/draw', app.controller.page.lottery.draw);
    app.post('/lottery/saveinfo', app.controller.page.lottery.saveinfo);

    //
    // app.get('/client', app.controller.home.home.client);
    // app.get('/element', app.controller.home.home.element);
    // app.get('/pager', app.controller.home.home.pager);
    //
    // app.get('/await', app.controller.await.await.index);
    // app.get('/await/client', app.controller.await.await.client);
    // app.get('/await/element', app.controller.await.await.element);
    // app.get('/await/pager', app.controller.await.await.pager);
    //
     app.get('/about', app.controller.about.about.index);
    // app.get('/router', app.controller.router.router.index);
    // app.get('/dynamic', app.controller.dynamic.dynamic.index);
    // app.get('/app/api/article/list', app.controller.app.app.list);
    // app.get('/app/api/article/:id', app.controller.app.app.detail);
    // app.get('/app(/.+)?', app.controller.app.app.index);
    // app.get('/less', app.controller.css.css.less);
    // app.get('/sass', app.controller.css.css.sass);
    // app.get('/test', app.controller.test.test.index);


    //app.get('/500', app.controller.home.error);
    //app.get('/404', app.controller.home.notFound);
};
