import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosRoutingModule } from './creditos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NewCreditPageComponent } from './pages/new-credit-page/new-credit-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MainPageComponent,
    NewCreditPageComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreditosModule { }
