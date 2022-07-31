import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/userManagement'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '首页' },
            children: [
                {
                    path: '/userManagement',
                    component: () => import(/* webpackChunkName: "userManagement" */ '../components/page/UserManagement.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/serverManagement',
                    component: () => import(/* webpackChunkName: "serverManagement" */ '../components/page/ServerManagement.vue'),
                    meta: { title: '服务端管理' }
                },
                {
                    path: '/logManagement',
                    component: () => import(/* webpackChunkName: "logManagement" */ '../components/page/LogManagement.vue'),
                    meta: { title: '日志管理' }
                },
                {
                    path: '/filterAccountManagement',
                    component: () =>
                        import(/* webpackChunkName: "filterAccountManagement" */ '../components/page/FilterAccountManagement.vue'),
                    meta: { title: '过滤管理' }
                },
                {
                    path: '/changePassword',
                    component: () => import(/* webpackChunkName: "changePassword" */ '../components/page/ChangePassword.vue'),
                    meta: { title: '修改密码' }
                }
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                //     meta: { title: '权限测试', permission: true }
                // }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
