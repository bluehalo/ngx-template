import './vendor.ts';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';
/* tslint:disable */
console.log('AOT MODE');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.aot.js.map