import { GetterTree } from 'vuex';
import { RootState } from '~app/core/store';
import { AuthState } from './state';

export const authGetters: GetterTree<AuthState, RootState> = {};
