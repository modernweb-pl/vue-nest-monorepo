import axios from 'axios';
import { Config, PUBLIC_PATH } from './types';

export const fetchConfig = (): Promise<Config> =>
  axios
    // fetch current environment configuration
    .get<Config>(PUBLIC_PATH + 'config/app.json')
    // fallback to default configuration
    .catch(() => axios.get<Config>(PUBLIC_PATH + 'config/app.default.json'))
    .then(({ data }) => data);
