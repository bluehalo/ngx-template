import './vendor.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/* tslint:disable */
console.log('JIT Mode');
platformBrowserDynamic().bootstrapModule(AppModule);
