import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)



import DashboardContent from '@/page/dashboard/component/dashboard-content'

import Dashboard from '@/page/dashboard/index'
import Login from '@/page/dashboard/login'

import HomeDashboardSidebarNav from '@/page/activity/_dashboard-sidebar-nav'


import ActivityDzp from '@/page/activity/dzp'
import DzpCreate from '@/page/activity/dzp_create'
import ActivityZjd from '@/page/activity/zjd'

import step1 from '@/page/activity/step1.vue'
import step2 from '@/page/activity/step2.vue'
import step3 from '@/page/activity/step3.vue'
import step4 from '@/page/activity/step4.vue'

import SettingsDashboardSidebarNav from '@/page/check/_dashboard-sidebar-nav'
import Check from '@/page/check/list'
import Manage from '@/page/check/manage'


export const constantRouterMap = [
    { path: '/message', component: _import('wechat/uc/message'), hidden: true },


]

export default new Router({

    // scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    base:'/uc',
    routes: constantRouterMap
})

