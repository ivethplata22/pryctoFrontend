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
export class ClientPageComponent implements OnInit {

  public cliente!: ClienteRespuesta;

  constructor(
    private _solicitudes: SolicitudesService,
    private router: Router,
    private _alerts: SweetAlertService,
  ) {
    this.cliente = this._solicitudes.cliente;
  }
  
  ngOnInit(): void {
    const clienteSearch = localStorage.getItem('clienteSearch');
    if (clienteSearch) {
      this.cliente = JSON.parse(clienteSearch) as ClienteRespuesta;
      this._solicitudes.cliente = this.cliente;
    }
  }

  verHistorial() {
    console.log('Ver historial de solicitudes');
  }

  crearNuevaSolicitud() {
    this.router.navigate(['/captura-datos-solicitud']);
  }

  editarCliente() {
    console.log('Editar cliente');
  }

  volver() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      '',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('clienteSearch');
        this.router.navigate(['/']);
      }
    });
  }

}
