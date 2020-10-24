import { AuthRequestDto, AuthTokenDto } from '@app/dto';
import axios from 'axios';

export function authenticate(login: string, password: string): Promise<AuthTokenDto> {
  return axios
    .post<AuthTokenDto>('/auth', { login, password } as AuthRequestDto)
    .then((res) => res.data)
    .catch((res) => {
      throw res.response;
    });
}
