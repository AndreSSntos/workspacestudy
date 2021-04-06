import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CalculadoraAngularModule } from './calculadora-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalculadoraAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
