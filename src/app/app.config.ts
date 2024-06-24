import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), {
    provide: NgMultiSelectDropDownModule,
    useValue: NgMultiSelectDropDownModule.forRoot()
  } ]
};
