import axios from 'axios';
import type { Config, ConfigJson } from './types';
import { PUBLIC_PATH } from './types';

export const fetchConfig = (): Promise<Config> =>
  axios
    // fetch current environment configuration
    .get<ConfigJson>(PUBLIC_PATH + 'config/app.json')
    // fallback to default configuration
    .catch(() => axios.get<ConfigJson>(PUBLIC_PATH + 'config/app.default.json'))
    .then(({ data }) => ({
      apiUrl: data.API_URL,
      demoMode: data.DEMO_MODE === '1' || data.DEMO_MODE === 'true',
    }));
