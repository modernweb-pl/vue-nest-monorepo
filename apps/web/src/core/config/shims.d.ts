import { Config } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    $config: Config;
  }
}
