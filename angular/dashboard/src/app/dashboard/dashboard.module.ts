import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DadosService } from './dados.service';
import { provideRoutes } from '@angular/router';
import { ProviderAst } from '@angular/compiler';



@NgModule({
  declarations:
    [DashboardComponent
    ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DadosService
  ]
  
})
export class DashboardModule { }
