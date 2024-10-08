import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-update-client-page',
  templateUrl: './update-client-page.component.html',
  styleUrl: './update-client-page.component.css'
})
export class UpdateClientPageComponent {
  public datosForm: FormGroup;
  public cliente!: Cliente;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _alerts: SweetAlertService,
    private _solicitudes: SolicitudesService
  ) {
    this.cliente = {
      nombre: this._solicitudes.getCliente()?.nombre_cliente || '',
      email: this._solicitudes.getCliente()?.email || '',
      telefono: this._solicitudes.getCliente()?.telefono || '',
      direccion: this._solicitudes.getCliente()?.direccion || '',
      ingresomensual: this._solicitudes.getCliente()?.ingreso_mensual || 1
    }

    this.datosForm = this.fb.group({
      nombre: [this.cliente.nombre || '', [Validators.required]],
      correo: [this.cliente.email || '', [Validators.required, Validators.email]],
      telefono: [this.cliente.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: [this.cliente.direccion || '', [Validators.required]],
      ingreso: [this.cliente.ingresomensual || '', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]]
    });
  }

  onSubmit() {
    // Formulario no es valido
    if(!this.datosForm.valid) {
      this._alerts.toastDisplay('error', 'Completa todos los campos');
      return;
    }

    this. cliente = {
      nombre: this.datosForm.get('nombre')?.value,
      email: this.datosForm.get('correo')?.value,
      telefono: this.datosForm.get('telefono')?.value,
      direccion: this.datosForm.get('direccion')?.value,
      ingresomensual: this.datosForm.get('ingreso')?.value
    };

    this._solicitudes.actualizarCliente(this._solicitudes.getCliente()?.id_cliente || 0, this.cliente.nombre, this.cliente.email, this.cliente.telefono, this.cliente.direccion, this.cliente.ingresomensual).subscribe(
      response => {
        this._alerts.toastDisplay('success', response.msg);
        
        this._solicitudes.obtenerClienteUUID(this._solicitudes.getCliente()?.uuid_cliente || '').subscribe(
          response => {
            this._solicitudes.setCliente(response);
            this.router.navigate(['/cliente']);
          },
          e => {
            this._alerts.toastDisplay('error', e.error.msg);
          }
        )
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
  }

  cancelar() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      'Si sales, se perderán los datos guardados.',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/cliente']);
      }
    });
  }
}
