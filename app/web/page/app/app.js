import { sync } from 'vuex-router-sync';
import store from 'store/admin';
import router from 'component/app/router';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';

import ElementUI from 'element-ui';
//import 'normalize.css';

import navMap from '@/config/navMap'


import '@/asset/style/theme/index.css';
import '@/asset/style/ext/ext.scss';

App.use(ElementUI);

App.component(Layout.name, Layout);


//App.config.productionTip = false

router.beforeEach((to, from, next) => {
    // authentication
    if (to.name !== 'login' && store.getters['authentication/accessToken'] === '') {
        next({name: 'login'})
        return
    }
    if (to.name === 'login' && store.getters['authentication/accessToken'] !== '') {
        next(false)
        return
    }

    // track nav active
    for (let i = 0; i < navMap.length; i++) {
        if (to.name === navMap[i].location.name) {
            store.dispatch('dashboard/topNavActive', i.toString())
            store.dispatch('dashboard/sidebarNavActive', '0')
            break
        }
        for (let j = 0; navMap[i].children && j < navMap[i].children.length; j++) {
            if (to.name === navMap[i].children[j].location.name) {
                store.dispatch('dashboard/topNavActive', i.toString())
                store.dispatch('dashboard/sidebarNavActive', j.toString())
                break
            }
        }
    }
    next()
})
//sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});
