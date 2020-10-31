export interface Config {
  apiUrl: string;
  demoMode: boolean;
}

export type ConfigState = Config;

export const PUBLIC_PATH = process.env.BASE_URL;
