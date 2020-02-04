import Vue from 'vue';
import Vuex from 'vuex';
import { RootState } from './state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
});

export { RootState };
