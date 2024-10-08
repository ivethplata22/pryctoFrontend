import { Component, OnInit } from '@angular/core';
import { ClienteRespuesta } from '../../interfaces/cliente.interface';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.css'
})
export class ClientPageComponent {

  public cliente: ClienteRespuesta | undefined;

  constructor(
    private _solicitudes: SolicitudesService,
    private router: Router,
    private _alerts: SweetAlertService,
  ) {
    this.cliente = this._solicitudes.getCliente();
  }

  verHistorial() {
    this.router.navigate(['/historial']);
  }

  crearNuevaSolicitud() {
    this.router.navigate(['/captura-datos-solicitud']);
  }

  editarCliente() {
    this.router.navigate(['/actualizar']);
  }

  volver() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      '',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

}
