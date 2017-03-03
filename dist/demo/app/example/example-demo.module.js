var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
// Local Imports
import { ExampleDemoComponent } from './example-demo.component';
import { ExampleModule } from '../../../example/example.module';
var ExampleDemoModule = (function () {
    function ExampleDemoModule() {
    }
    return ExampleDemoModule;
}());
ExampleDemoModule = __decorate([
    NgModule({
        imports: [
            ExampleModule
        ],
        declarations: [
            ExampleDemoComponent
        ],
        exports: [
            ExampleDemoComponent
        ],
        bootstrap: [ExampleDemoComponent],
        providers: []
    })
], ExampleDemoModule);
export { ExampleDemoModule };
//# sourceMappingURL=example-demo.module.js.map