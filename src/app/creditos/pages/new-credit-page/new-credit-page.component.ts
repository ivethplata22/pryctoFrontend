import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Sucursal } from '../../interfaces/sucursales.interface';
import { SolicitudCompleta } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-new-credit-page',
  templateUrl: './new-credit-page.component.html',
  styleUrl: './new-credit-page.component.css'
})
export class NewCreditPageComponent implements OnInit {
  public datosForm: FormGroup;
  public datosCreditoForm: FormGroup;
  public sucursales: Sucursal[] = [];
  public page = 1;
  private solicitudCompleta: SolicitudCompleta = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ingresomensual: 0,
    id_sucursal: 0,
    monto: 0,
    plazo: 0
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _alerts: SweetAlertService,
    private _solicitudes: SolicitudesService
  ) {
    this.datosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: ['', [Validators.required]],
      ingreso: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]]
    });

    this.datosCreditoForm = this.fb.group({
      id_sucursal: [null, [this.sucursalValidator]],
      monto: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]],
      plazo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    if(!localStorage.getItem('cliente')) return;

    const cliente = JSON.parse(localStorage.getItem('cliente') || '{}');

    this.datosForm = this.fb.group({
      nombre: [cliente.nombre || '', [Validators.required]],
      correo: [cliente.email || '', [Validators.required, Validators.email]],
      telefono: [cliente.telefono || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: [cliente.direccion || '', [Validators.required]],
      ingreso: [cliente.ingresomensual || '', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]]
    });

    this.solicitudCompleta.nombre = cliente.nombre;
    this.solicitudCompleta.email = cliente.email;
    this.solicitudCompleta.telefono = cliente.telefono;
    this.solicitudCompleta.direccion = cliente.direccion;
    this.solicitudCompleta.ingresomensual = cliente.ingresomensual;
  }

  sucursalValidator(control: AbstractControl) {
    return control.value !== null && control.value !== '' ? null : { required: true };
  }

  onSubmit() {
    // Formulario no es valido
    if(!this.datosForm.valid) {
      this._alerts.toastDisplay('error', 'Completa todos los campos');
      return;
    }

    const cliente = {
      nombre: this.datosForm.get('nombre')?.value,
      email: this.datosForm.get('correo')?.value,
      telefono: this.datosForm.get('telefono')?.value,
      direccion: this.datosForm.get('direccion')?.value,
      ingresomensual: this.datosForm.get('ingreso')?.value
    };

    this.solicitudCompleta.nombre = cliente.nombre;
    this.solicitudCompleta.email = cliente.email;
    this.solicitudCompleta.telefono = cliente.telefono;
    this.solicitudCompleta.direccion = cliente.direccion;
    this.solicitudCompleta.ingresomensual = cliente.ingresomensual;

    localStorage.setItem('cliente', JSON.stringify(cliente));

    this._alerts.toastDisplay('success', 'Datos guardados correctamente');

    this._solicitudes.obtenerSucursales().subscribe(
      response => {
        this.sucursales = response;
        this.page = 2;
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
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

    this.solicitudCompleta.id_sucursal = credito.id_sucursal;
    this.solicitudCompleta.monto = credito.monto;
    this.solicitudCompleta.plazo = credito.plazo;

    this._solicitudes.crearSolicitudCompleta(this.solicitudCompleta).subscribe(
      response => {
        this._alerts.toastDisplay('success', response.msg);
        this._solicitudes.UUIDCliente = response.uuidCliente;
        localStorage.removeItem('cliente');
        
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

  cancelar() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      'Si sales, se perderán los datos guardados.',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cliente');
        this.router.navigate(['/']);
      }
    });
  }

  regresar() {
    this.page = 1;
  }

}
