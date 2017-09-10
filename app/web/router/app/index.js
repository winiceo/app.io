import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
import navMap from '@/config/navMap'

Vue.use(Router)





/* layout */

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/


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

import SettingsDashboardSidebarNav from '@/page/settings/_dashboard-sidebar-nav'
import SettingsDemo from '@/page/settings/demo'
import SettingsDemo2 from '@/page/settings/demo2'
export const constantRouterMap = [
    { path: '/login', component: _import('dashboard/login'), hidden: true },
    //{ path: '/authredirect', component: _import('dashboard/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
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
                        path: 'dzp',
                        alias: '',
                        name: 'activity-dzp',
                        component: ActivityDzp
                    }, {
                        path: 'dzp/create',
                        alias: '',
                        name: 'dzp-create',
                        component: DzpCreate,

                        children:[
                            { path: ''  , name:'create_setp', component: step1  },
                            { path: 'step1',name:'create_setp1', component: step1  },
                            { path: 'step2',name:'create_setp2', component: step2  },
                            { path: 'step3',name:'create_setp3', component: step3  },
                            { path: 'step4',name:'create_setp4', component: step4  }
                        ]

                    },
                    {
                        path: 'zjd',
                        name: 'activity-zjd',
                        component: ActivityZjd
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
    // {
    //     path: '/',
    //     component: _import('dashboard/index'),
    //
    //     children: [
    //         {
    //             path: '',
    //             alias: '',
    //             components: {
    //                 default: _import('dashboard/@/page/dashboard/component/dashboard-content'),
    //                 sidebarNav:_import('home/_dashboard-sidebar-nav')
    //             },
    //             props: {
    //                 sidebarNav: {
    //                     navMap: navMap[0].children
    //                 }
    //             },
    //             children: [
    //                 {
    //                     path: 'welcome',
    //                     alias: '',
    //                     name: 'home-welcome',
    //                     component: _import('home/welcome')
    //                 },
    //                 {
    //                     path: 'demo',
    //                     name: 'home-demo',
    //                     component: _import('home/welcome')
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'settings',
    //             components: {
    //                 default: _import('dashboard/@/page/dashboard/component/dashboard-content'),
    //                 sidebarNav:_import('home/_dashboard-sidebar-nav')
    //             },
    //             props: {
    //                 sidebarNav: {
    //                     navMap: navMap[1].children
    //                 }
    //             },
    //             children: [
    //                 {
    //                     path: 'demo',
    //                     alias: '',
    //                     name: 'settings-demo',
    //                     component: _import('home/welcome')
    //                 },
    //                 {
    //                     path: 'demo2',
    //                     name: 'settings-demo2',
    //                     component: _import('home/welcome')
    //                 }
    //             ]
    //         }
    //     ]
    // },
    //   {
    //   path: '/',
    //
    //   component: _import('dashboard/dashboard'),
    //   name: '首页',
    //
    //   children: [
    //         {
    //             path: '',
    //             alias: '',
    //             components: {
    //                 default: _import('dashboard/dashboard-content'),
    //                 sidebarNav:_import('home/_dashboard-sidebar-nav')
    //             },
    //             props: {
    //                 sidebarNav: {
    //                     navMap: navMap[0].children
    //                 }
    //             },
    //             children: [
    //                 {
    //                     path: 'welcome',
    //                     alias: '',
    //                     name: 'home-welcome',
    //                     component: _import('home/welcome')
    //                 },
    //                 {
    //                     path: 'demo',
    //                     name: 'home-demo',
    //                     component: _import('home/welcome')
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'settings',
    //             components: {
    //                 default: _import('dashboard/dashboard-content'),
    //                 sidebarNav:_import('home/_dashboard-sidebar-nav')
    //             },
    //             props: {
    //                 sidebarNav: {
    //                     navMap: navMap[1].children
    //                 }
    //             },
    //             children: [
    //                 {
    //                     path: 'demo',
    //                     alias: '',
    //                     name: 'settings-demo',
    //                     component: _import('home/welcome')
    //                 },
    //                 {
    //                     path: 'demo2',
    //                     name: 'settings-demo2',
    //                     component: _import('home/welcome')
    //                 }
    //             ]
    //         }
    //     ]
    // },

]

export default new Router({

    // scrollBehavior: () => ({ y: 0 }),
    mode: 'history',
    base:'/app',
    routes: constantRouterMap
})

export const asyncRouterMap = [
    // {
    //   path: '/permission',
    //   component: Layout,
    //   redirect: '/permission/index',
    //   name: '权限测试',
    //   icon: 'quanxian',
    //   meta: { role: ['admin'] },
    //   noDropdown: true,
    //   children: [{ path: 'index', component: _import('permission/index'), name: '权限测试页', meta: { role: ['admin'] }}]
    // },
    // {
    //   path: '/icon',
    //   component: Layout,
    //   icon: 'icons',
    //   noDropdown: true,
    //   children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
    // },
    // {
    //   path: '/components',
    //   component: Layout,
    //   redirect: '/components/index',
    //   name: '组件',
    //   icon: 'zujian',
    //   children: [
    //     { path: 'index', component: _import('components/index'), name: '介绍 ' },
    //     { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
    //     { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
    //     { path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器' },
    //     { path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽' },
    //     { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
    //     { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
    //     { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
    //     { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
    //     { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
    //     { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
    //     { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
    //   ]
    // },
    // {
    //   path: '/charts',
    //   component: Layout,
    //   redirect: '/charts/index',
    //   name: '图表',
    //   icon: 'tubiao',
    //   children: [
    //     { path: 'index', component: _import('charts/index'), name: '介绍' },
    //     { path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表' },
    //     { path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2' },
    //     { path: 'line', component: _import('charts/line'), name: '折线图' },
    //     { path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表' }
    //   ]
    // },
    // {
    //   path: '/example',
    //   component: Layout,
    //   redirect: 'noredirect',
    //   name: '综合实例',
    //   icon: 'zonghe',
    //   children: [
    //     {
    //       path: '/example/table',
    //       component: _import('example/table/index'),
    //       redirect: '/example/table/table',
    //       name: 'Table',
    //       icon: 'table',
    //       children: [
    //         { path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '动态table' },
    //         { path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table' },
    //         { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑' },
    //         { path: 'table', component: _import('example/table/table'), name: '综合table' }
    //       ]
    //     },
    //     { path: 'form/edit', icon: 'shouce', component: _import('example/form'), name: '编辑Form', meta: { isEdit: true }},
    //     { path: 'form/create', icon: 'from', component: _import('example/form'), name: '创建Form' },
    //     { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab' }
    //   ]
    // },
    // {
    //   path: '/error',
    //   component: Layout,
    //   redirect: 'noredirect',
    //   name: '错误页面',
    //   icon: '404',
    //   children: [
    //     { path: '401', component: _import('errorPage/401'), name: '401' },
    //     { path: '404', component: _import('errorPage/404'), name: '404' }
    //   ]
    // },
    // {
    //   path: '/errlog',
    //   component: Layout,
    //   redirect: 'noredirect',
    //   name: 'errlog',
    //   icon: 'bug',
    //   noDropdown: true,
    //   children: [{ path: 'log', component: _import('errlog/index'), name: '错误日志' }]
    // },
    // {
    //   path: '/excel',
    //   component: Layout,
    //   redirect: '/excel/download',
    //   name: 'excel',
    //   icon: 'EXCEL',
    //   children: [
    //     { path: 'download', component: _import('excel/index'), name: '导出excel' },
    //     { path: 'download2', component: _import('excel/selectExcel'), name: '导出已选择项' }
    //   ]
    // },
    // {
    //   path: '/theme',
    //   component: Layout,
    //   redirect: 'noredirect',
    //   name: 'theme',
    //   icon: 'theme',
    //   noDropdown: true,
    //   children: [{ path: 'index', component: _import('theme/index'), name: '换肤' }]
    // },

    { path: '*', redirect: '/404', hidden: true }
]
