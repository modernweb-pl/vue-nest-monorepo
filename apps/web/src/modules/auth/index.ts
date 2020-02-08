import { appInitializer } from '~app/core';
import store from '~app/core/store';
import { tokenInitializer } from './domain/token';
import './routes';
import { AUTH_NAMESPACE, authStore } from './store';

store.registerModule(AUTH_NAMESPACE, authStore);

appInitializer.register(tokenInitializer);
