import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosRoutingModule } from './creditos-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NewCreditPageComponent } from './pages/new-credit-page/new-credit-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApprovedPageComponent } from './pages/approved-page/approved-page.component';
import { RefusedPageComponent } from './pages/refused-page/refused-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { CreditPageComponent } from './pages/credit-page/credit-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MainPageComponent,
    NewCreditPageComponent,
    ApprovedPageComponent,
    RefusedPageComponent,
    SearchPageComponent,
    ClientPageComponent,
    CreditPageComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CreditosModule { }
