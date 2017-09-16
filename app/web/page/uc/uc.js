import {sync} from 'vuex-router-sync';
import router from '@/router/uc';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/uc';



import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
 
App.use(YDUI);

App.component(Layout.name, Layout);

//sync(store, router);


export default App.init({
    base: '/uc',
    ...app,
    router

});
