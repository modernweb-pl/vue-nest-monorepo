import type { AuthProfileDto, AuthRefreshRequestDto, AuthRequestDto, AuthTokenDto } from '@app/dto';
import axios from 'axios';

export function authenticate(login: string, password: string): Promise<AuthTokenDto> {
  return axios
    .post<AuthTokenDto>('/api/auth', { login, password } as AuthRequestDto)
    .then((res) => res.data)
    .catch((res) => {
      throw res.response;
    });
}

export function refreshToken(refreshToken: string): Promise<AuthTokenDto> {
  return axios
    .post<AuthTokenDto>('/api/auth/refresh', { refreshToken } as AuthRefreshRequestDto)
    .then((res) => res.data);
}

export function fetchAuthProfile(): Promise<AuthProfileDto> {
  return axios.get<AuthProfileDto>('/api/me').then((res) => res.data);
}
