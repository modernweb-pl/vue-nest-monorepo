import { Module } from 'vuex';
import { RootState } from '../store';
import { fetchConfig } from './service';
import { ConfigState } from './types';

export const NAMESPACE = 'config';

export enum ConfigStoreAction {
  FETCH = 'fetch',
}

export enum ConfigStoreMutation {
  SET = 'set',
}

export enum ConfigStoreGetters {
  GET = 'get',
}

export const configStore: Module<ConfigState, RootState> = {
  namespaced: true,
  actions: {
    [ConfigStoreAction.FETCH]: ({ commit }) =>
      fetchConfig().then((res) => commit(ConfigStoreMutation.SET, res)),
  },
  mutations: {
    [ConfigStoreMutation.SET]: (state, payload) => {
      Object.assign(state, payload);
    },
  },
  getters: {
    [ConfigStoreGetters.GET]: (state) => state,
  },
};
