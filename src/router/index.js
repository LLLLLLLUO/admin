import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue'),
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/member/index.vue')
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/supplier/index.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods/index.vue')
      },
      {
        path: '/staff',
        name: 'user',
        component: () => import('../views/staff/index.vue')
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
