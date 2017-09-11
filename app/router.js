module.exports = app => {

    app.io.route('chat', app.io.controllers.chat);

    // app.io.of('/chat')
    app.io.of('/chat').route('chat', app.io.controllers.chat);


    app.get('/index',  app.controller.home.home.index);

    app.get('/app/api/article/list', app.controller.app.app.list);
    app.get('/app/api/article/:id', app.controller.app.app.detail);
    app.get('/app(/.+)?', app.controller.app.app.index);

    app.post('/api/v1/user/login', 'user.user.login')
    app.post('/api/v1/user/register', 'user.user.register')

    app.post('/api/v1/user/logout', 'user.user.logout')
    app.get('/api/v1/user/info', 'user.user.userinfo')

    app.get('/api/v1/activity/list', 'api.activity.list')

    app.post('/api/v1/activity/save', 'api.activity.save')



    app.get('/pages/:id', app.controller.page.page.detail);

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
    // app.get('/about', app.controller.about.about.index);
    // app.get('/router', app.controller.router.router.index);
    // app.get('/dynamic', app.controller.dynamic.dynamic.index);
    // app.get('/app/api/article/list', app.controller.app.app.list);
    // app.get('/app/api/article/:id', app.controller.app.app.detail);
    // app.get('/app(/.+)?', app.controller.app.app.index);
    // app.get('/less', app.controller.css.css.less);
    // app.get('/sass', app.controller.css.css.sass);
    // app.get('/test', app.controller.test.test.index);



   // app.get('/500', app.controller.home.error);
    app.get('/*', app.controller.home.notFound);
};
