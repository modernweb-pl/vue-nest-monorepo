export interface ConfigJson {
  API_URL: string;
  DEMO_MODE: string | boolean;
}

export interface Config {
  apiUrl: string;
  demoMode: boolean;
}

export type ConfigState = Config;

export const PUBLIC_PATH = import.meta.env.BASE_URL;
