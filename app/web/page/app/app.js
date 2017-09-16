import {sync} from 'vuex-router-sync';
import store from 'store/app';
import router from '@/router/app';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';
import navMap from '@/config/navMap'
import ElementUI from 'element-ui';
import '@/asset/style/theme/index.css';
import '@/asset/style/ext/ext.scss';

App.use(ElementUI);

//alert(process.browser)
if (process.browser) {

    require('quill/dist/quill.snow.css')
    require('quill/dist/quill.bubble.css')
    require('quill/dist/quill.core.css')
    const VueQuillEditor = require('@/utils/quill')
    App.use(VueQuillEditor)
}

App.component(Layout.name, Layout);
import '@/icons' // icon
import './errorLog'// error log
import './permission' // 权限
//App.config.productionTip = false
import {getToken} from '@/utils/auth' // 验权
router.beforeEach((to, from, next) => {
    // authentication
    //获取store里面的token

    // track nav active
    for (let i = 0; i < navMap.length; i++) {
        if (to.name === navMap[i].location.name) {
            store.dispatch('topNavActive', i.toString())
            store.dispatch('sidebarNavActive', '0')
            break
        }
        for (let j = 0; navMap[i].children && j < navMap[i].children.length; j++) {
            if (to.name === navMap[i].children[j].location.name) {
                store.dispatch('topNavActive', i.toString())
                store.dispatch('sidebarNavActive', j.toString())
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
