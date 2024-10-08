import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NewCreditPageComponent } from './pages/new-credit-page/new-credit-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'principal', component: MainPageComponent },
      { path: 'captura-datos', component: NewCreditPageComponent },
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: '**', redirectTo: 'principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
