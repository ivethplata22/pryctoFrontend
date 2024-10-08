import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-approved-page',
  templateUrl: './approved-page.component.html',
  styleUrl: './approved-page.component.css'
})
export class ApprovedPageComponent {

  constructor(
    private router: Router,
    private _solicitudes: SolicitudesService
  ) {}

  volverAlInicio() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  UUID() {
    return this._solicitudes.getUUIDCliente();
  }

}
