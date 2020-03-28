import axios from 'axios';
import { appConfig } from '~app/core';

axios.interceptors.request.use((config) => {
  config.baseURL = appConfig?.API_URL;

  return config;
});
