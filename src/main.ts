/**
 * dev - npm run watch:iis
 * build - npm run build:aot
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppSettings } from './app/app-settings';

console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', 'EOA ' + AppSettings.APP_VERSION + ' [ DEV mode ]');
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
