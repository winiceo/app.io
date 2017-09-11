/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from '@/layout/';
import {Login} from '@/page/dashboard/login';


import Function from './function/';


export default new Router({
    mode: 'history',
    base:'/app',
	routes: [

		Function

	]
})