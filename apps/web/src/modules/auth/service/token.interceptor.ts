import type { AuthTokenDto } from '@app/dto';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import store from '~app/core/store';
import { authActions, authGetters } from '../store';

export function authTokenInterceptor(
  request: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  const token: AuthTokenDto = store.getters[authGetters.token];
  if (token) {
    request.headers.Authorization = `Bearer ${token.access}`;
  }

  return Promise.resolve(request);
}

let _tokenRefreshRequest: Promise<AxiosResponse> | void;

export function refreshTokenInterceptor(error: AxiosError): Promise<AxiosResponse> {
  if (error.response?.status === 401 && !error.config?.url?.includes('auth')) {
    if (!_tokenRefreshRequest) {
      _tokenRefreshRequest = store.dispatch(authActions.refreshToken);
    }

    return _tokenRefreshRequest
      .then(() => axios.request({ ...error.config }))
      .finally(() => (_tokenRefreshRequest = void 0));
  }

  throw error;
}
