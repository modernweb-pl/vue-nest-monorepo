export interface AuthRequestDto {
  login: string;
  password: string;
}

export interface AuthRefreshRequestDto {
  refreshToken: string;
}
