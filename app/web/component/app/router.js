import Vue from 'vue'
import Router from 'vue-router'

import navMap from '@/config/navMap'

import DashboardContent from '@/component/dashboard/dashboard-content'

import Dashboard from '@/page/dashboard/dashboard'
import Login from '@/page/dashboard/login'

import HomeDashboardSidebarNav from '@/page/home/_dashboard-sidebar-nav'
import HomeWelcome from '@/page/home/welcome'
import HomeDemo from '@/page/home/demo'

import SettingsDashboardSidebarNav from '@/page/settings/_dashboard-sidebar-nav'
import SettingsDemo from '@/page/settings/demo'
import SettingsDemo2 from '@/page/settings/demo2'

Vue.use(Router)

export default new Router({
     mode: 'history',
    base:'/app',
    routes: [
        {
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: '',
                    alias: '',
                    components: {
                        default: DashboardContent,
                        sidebarNav: HomeDashboardSidebarNav
                    },
                    props: {
                        sidebarNav: {
                            navMap: navMap[0].children
                        }
                    },
                    children: [
                        {
                            path: 'welcome',
                            alias: '',
                            name: 'home-welcome',
                            component: HomeWelcome
                        },
                        {
                            path: 'demo',
                            name: 'home-demo',
                            component: HomeDemo
                        }
                    ]
                },
                {
                    path: 'settings',
                    components: {
                        default: DashboardContent,
                        sidebarNav: SettingsDashboardSidebarNav
                    },
                    props: {
                        sidebarNav: {
                            navMap: navMap[1].children
                        }
                    },
                    children: [
                        {
                            path: 'demo',
                            alias: '',
                            name: 'settings-demo',
                            component: SettingsDemo
                        },
                        {
                            path: 'demo2',
                            name: 'settings-demo2',
                            component: SettingsDemo2
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
