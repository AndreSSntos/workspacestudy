import { TestBed } from '@angular/core/testing';
// import { inject } from '@angular/core';
import { AppComponent } from './app.component';

import { CalculadoraAngularModule } from './calculadora-angular';


describe('AppComponent', () => {
  beforeEach(async () => {
   TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
         CalculadoraAngularModule
      ],      
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
