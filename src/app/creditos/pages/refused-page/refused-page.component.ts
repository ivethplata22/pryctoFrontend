import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refused-page',
  templateUrl: './refused-page.component.html',
  styleUrl: './refused-page.component.css'
})
export class RefusedPageComponent {

  constructor(
    private router: Router
  ) {}

  volverAlInicio() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}