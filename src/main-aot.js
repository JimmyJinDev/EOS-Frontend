import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
console.log('[ Running AOT compiled ] - main-aot.ts');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main-aot.js.map