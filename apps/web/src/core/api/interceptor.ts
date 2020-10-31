import axios from 'axios';
import { getConfig } from '../config';

axios.interceptors.request.use((config) => {
  config.baseURL = getConfig().apiUrl;

  return config;
});
