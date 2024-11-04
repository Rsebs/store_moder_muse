// Types
import type { App } from 'vue';

// Plugins
import { Quasar, plugins } from './quasar';
import router from '../router';

export function registerPlugins(app: App) {
  app
    .use(Quasar, {
      plugins,
    })
    .use(router);
}
