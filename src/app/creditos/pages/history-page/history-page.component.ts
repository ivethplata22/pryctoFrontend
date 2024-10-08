import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolicitudesRespuestaArray } from '../../interfaces/solicitud.interface';
import { SweetAlertService } from '../../services/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit {
  public historialSolicitudes: SolicitudesRespuestaArray[] = [];

  constructor(
    private _solicitudes: SolicitudesService,
    private _alerts: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._solicitudes.obtenerSolicitudesClienteID(this._solicitudes.getCliente()?.id_cliente || 0).subscribe(
      response => {
        this.historialSolicitudes = response;
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
  }

  regresar() {
    this.router.navigate(['/cliente']);
  }

}
