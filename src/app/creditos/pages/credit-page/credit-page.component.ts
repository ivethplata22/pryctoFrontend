import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from '../../interfaces/sucursales.interface';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ClienteRespuesta } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.css'
})
export class CreditPageComponent implements OnInit {
  public datosCreditoForm: FormGroup;
  public sucursales: Sucursal[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _alerts: SweetAlertService,
    private _solicitudes: SolicitudesService
  ) {
    this.datosCreditoForm = this.fb.group({
      id_sucursal: [null, [this.sucursalValidator]],
      monto: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]],
      plazo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    const clienteSearch = localStorage.getItem('clienteSearch');
    if (clienteSearch) {
      this._solicitudes.cliente = JSON.parse(clienteSearch) as ClienteRespuesta;
    }

    this._solicitudes.obtenerSucursales().subscribe(
      response => {
        this.sucursales = response;
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    );
  }

  sucursalValidator(control: AbstractControl) {
    return control.value !== null && control.value !== '' ? null : { required: true };
  }

  onSubmitCredit() {

    // Formulario no es valido
    if(!this.datosCreditoForm.valid) {
      this._alerts.toastDisplay('error', 'Completa todos los campos');
      return;
    }

    const credito = {
      id_sucursal: this.datosCreditoForm.get('id_sucursal')?.value,
      monto: this.datosCreditoForm.get('monto')?.value,
      plazo: this.datosCreditoForm.get('plazo')?.value
    };

    if(!this._solicitudes.cliente.uuid_cliente) {
      this._alerts.toastDisplay('error', 'No es posible completar la solicitud');
      return;
    }

    this._solicitudes.crearSolicitud(this._solicitudes.cliente.uuid_cliente, credito.id_sucursal, credito.monto, credito.plazo).subscribe(
      response => {
        this._alerts.toastDisplay('success', response.msg);
        this._solicitudes.UUIDCliente = this._solicitudes.cliente.uuid_cliente;
        localStorage.removeItem('clienteSearch');
        
        if (response.estadoSolicitud === 'aprobado') {
          setTimeout(() => {
            this.router.navigate(['/aprobada']);
          }, 2000);
        } else {
          setTimeout(() => {
            this.router.navigate(['/rechazada']);
          }, 2000);
        }
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )

  }

  regresar() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      '',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cliente']);
      }
    });
  }
}
