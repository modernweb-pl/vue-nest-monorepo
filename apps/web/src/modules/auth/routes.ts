import router from '~app/core/router';

const routes = [
  {
    path: '/login',
    name: 'auth-login',
    component: () => import(/* webpackChunkName: "auth" */ './views/login.vue'),
  },
];

router.addRoutes(routes);
