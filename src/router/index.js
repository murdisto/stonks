import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { auth } from '../firebase';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresGuest: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'../views/Login.vue'), // lazy load
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */'../views/Dashboard.vue'), // lazy load
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)*",
    name: 'notFound',
    component: () => import(/* webpackChunkName: "NotFound" */'../views/NotFound.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (auth.currentUser) {
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
