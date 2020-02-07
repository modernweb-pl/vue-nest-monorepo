import { RouteConfig } from 'vue-router';
import { NavigationGuard } from 'vue-router/types/router';

declare module 'vue-router/types/router' {
  interface RouteConfig {
    meta?:
      | any
      | {
          authRequired?: boolean;
          beforeResolve: NavigationGuard;
        };
  }
}
