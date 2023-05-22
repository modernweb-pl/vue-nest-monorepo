import type { AuthTokenDto } from '@app/dto';
import axios from 'axios';
import { appInitializer } from '~app/core';
import router from '~app/core/router';
import store from '~app/core/store';
import { AuthRoute, authRoutes } from './routes';
import { authTokenInterceptor, refreshTokenInterceptor } from './service';
import { AUTH_NAMESPACE, authActions, authGetters, authStore } from './store';

store.registerModule(AUTH_NAMESPACE, authStore);
store.watch(
  (state, getters) => getters[authGetters.token],
  (token: AuthTokenDto) => {
    if (!token) {
      return router.push({ name: AuthRoute.LOGIN, query: { back: router.currentRoute.fullPath } });
    }
  },
);

appInitializer.register(() => store.dispatch(authActions.loadToken));

axios.interceptors.request.use(authTokenInterceptor);
axios.interceptors.response.use(
  (response) => response,
  (error) => refreshTokenInterceptor(error),
);

router.addRoutes(authRoutes);
router.beforeEach((to, from, next) =>
  appInitializer.resolve().then(() => {
    const authRequired = to.matched.some((route) => route.meta.authRequired);
    const loggedIn = store.getters[authGetters.loggedIn];

    if (!authRequired || loggedIn) return next();

    next({ name: AuthRoute.LOGIN, query: { back: to.fullPath } });
  }),
);

export * from './service';
