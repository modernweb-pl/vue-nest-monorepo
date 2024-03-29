import type { RawLocation, Route, RouteConfig } from 'vue-router';
import store from '~app/core/store';
import { authActions, authGetters } from './store';

export enum AuthRoute {
  LOGIN = 'auth-login',
  LOGOUT = 'auth-logout',
  PROFILE = 'auth-profile',
}

export const authRoutes: RouteConfig[] = [
  {
    path: '/login',
    name: AuthRoute.LOGIN,
    component: () => import(/* webpackChunkName: "auth" */ './views/login.vue'),
    beforeEnter(to, from, next) {
      const loggedIn = store.getters[authGetters.loggedIn];
      if (loggedIn) {
        return next(from.name ? from.fullPath : { name: 'home' });
      }

      next();
    },
  },
  {
    path: '/logout',
    name: AuthRoute.LOGOUT,
    meta: {
      authRequired: true,
      beforeResolve(to: Route, from: Route, next: (to?: RawLocation) => void) {
        store.dispatch(authActions.logout).then(() => {
          const authRequiredOnPreviousRoute = from.matched.some((route) => route.meta.authRequired);
          // navigate back to previous page, or home as a fallback
          next(authRequiredOnPreviousRoute ? { name: 'home' } : from.fullPath);
        });
      },
    },
  },
  {
    path: '/profile',
    name: AuthRoute.PROFILE,
    component: () => import(/* webpackChunkName: "auth" */ './views/profile.vue'),
    meta: {
      authRequired: true,
    },
  },
];
