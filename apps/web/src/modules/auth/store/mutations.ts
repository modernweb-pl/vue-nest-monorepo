import type { AuthProfileDto, AuthTokenDto } from '@app/dto';
import { createMutationFactory } from '~app/shared/store';
import type { AuthState } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setToken: createMutation((state, token: AuthTokenDto) => {
    state.token = token;
  }),
  setProfile: createMutation((state, profile: AuthProfileDto) => {
    state.profile = profile;
  }),
};
