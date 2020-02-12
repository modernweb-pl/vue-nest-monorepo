import axios from 'axios';
import { appInitializer, InitializerTask } from '~app/core';

export interface Config {
  API_URL: string;
}

const PUBLIC_PATH = process.env.BASE_URL;

export let appConfig: Config | null = null;

export const configInitializer: InitializerTask = () =>
  axios
    // fetch current environment configuration
    .get<Config>(PUBLIC_PATH + 'config/app.json')
    // fallback to default configuration
    .catch(() => axios.get<Config>(PUBLIC_PATH + 'config/app.default.json'))
    .catch(e => {
      console.error(e); // eslint-disable-line no-console
      return { data: null };
    })
    .then(res => (appConfig = res.data));

appInitializer.register(configInitializer);
