import { PluginFunction } from 'vue';
import store from '../store';
import { ConfigStoreGetters, NAMESPACE } from './store';

export const ConfigPlugin: PluginFunction<void> = (Vue) => {
  Object.defineProperty(Vue.prototype, '$config', {
    get() {
      return store.getters[`${NAMESPACE}/${ConfigStoreGetters.GET}`];
    },
  });
};
