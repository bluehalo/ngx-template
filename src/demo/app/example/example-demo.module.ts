import { NgModule } from '@angular/core';

// Local Imports
import { ExampleDemoComponent } from './example-demo.component';
import { ExampleModule } from '../../../library/src/lib/example.module';

@NgModule({
	imports: [
		ExampleModule
	],
	declarations: [
		ExampleDemoComponent
	],
	exports: [
		ExampleDemoComponent
	],
	bootstrap: [ ExampleDemoComponent ],
	providers: [ ]
})
export class ExampleDemoModule { }
