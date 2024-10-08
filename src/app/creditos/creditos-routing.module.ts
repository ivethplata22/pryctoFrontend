import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NewCreditPageComponent } from './pages/new-credit-page/new-credit-page.component';
import { ApprovedPageComponent } from './pages/approved-page/approved-page.component';
import { RefusedPageComponent } from './pages/refused-page/refused-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { CreditPageComponent } from './pages/credit-page/credit-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'principal', component: MainPageComponent },
      { path: 'captura-datos', component: NewCreditPageComponent },
      { path: 'aprobada', component: ApprovedPageComponent },
      { path: 'rechazada', component: RefusedPageComponent },
      { path: 'buscar', component: SearchPageComponent },
      { path: 'cliente', component: ClientPageComponent },
      { path: 'captura-datos-solicitud', component: CreditPageComponent },
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
