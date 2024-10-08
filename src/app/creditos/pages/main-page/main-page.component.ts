import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SweetAlertService } from '../../services/sweetalert.service';
import { Indicadores } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  public indicadores!: Indicadores;

  constructor(
    private router: Router,
    private _solicitudes: SolicitudesService,
    private _alerts: SweetAlertService
  ) { }

  ngOnInit(): void {
    this._solicitudes.indicadoresSolicitudes().subscribe(
      response => {
        this.indicadores = response;
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
  }

  nuevaSolicitud() {
    this.router.navigate(['/captura-datos']);
  }

  buscarPorUsuario() {
    this.router.navigate(['/buscar']);
  }

  simularSolicitudes() {
    this._solicitudes.simularSolicitudes().subscribe(
      response => {
        this._alerts.toastDisplay('success', response.msg);
        console.log(response);
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
  }

}