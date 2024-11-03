// Types
import type { App } from 'vue';

// Plugins
import { Quasar, plugins } from './quasar';

export function registerPlugins(app: App) {
  app
    .use(Quasar, {
      plugins,
    });
}
