import Vue from 'vue';
import type { InitializerTask } from '../app/initializer';
import { appInitializer } from '../app/initializer';
import store from '../store';
import { ConfigPlugin } from './plugin';
import { configStore, ConfigStoreAction, ConfigStoreGetters, NAMESPACE } from './store';
import type { Config } from './types';

Vue.use(ConfigPlugin);

export const getConfig = (): Config => store.getters[`${NAMESPACE}/${ConfigStoreGetters.GET}`];

export const configInitializer: InitializerTask = () => {
  store.registerModule(NAMESPACE, configStore);
  return store.dispatch(`${NAMESPACE}/${ConfigStoreAction.FETCH}`);
};

appInitializer.register(configInitializer);

export * from './types';
