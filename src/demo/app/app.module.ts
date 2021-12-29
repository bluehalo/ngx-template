import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExampleDemoModule } from './example/example-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExampleDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
