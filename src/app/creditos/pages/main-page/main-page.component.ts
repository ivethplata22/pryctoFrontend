import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(
    private router: Router
  ) { }

  nuevaSolicitud() {
    this.router.navigate(['/captura-datos']);
  }

  buscarPorUsuario() {
    this.router.navigate(['/buscar']);
  }

}