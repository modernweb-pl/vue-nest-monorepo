import { AuthTokenDto } from '@app/dto';
import { createMutationFactory } from '~app/shared/store';
import { storeToken } from '../domain/token';
import { AuthState } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setToken: createMutation((state, token: AuthTokenDto) => {
    storeToken(token);
    state.token = token;
  }),
};
