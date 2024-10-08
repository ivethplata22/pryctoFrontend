import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  public datosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _alerts: SweetAlertService,
    private _solicitudes: SolicitudesService
  ) {
    this.datosForm = this.fb.group({
      uuid: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // Formulario no es valido
    if(!this.datosForm.valid) {
      this._alerts.toastDisplay('error', 'Completa todos los campos');
      return;
    }

    const uuid = this.datosForm.get('uuid')?.value;

    this._solicitudes.obtenerClienteUUID(uuid).subscribe(
      response => {
        this._solicitudes.setCliente(response);
        this.router.navigate(['/cliente']);
      },
      e => {
        this._alerts.toastDisplay('error', e.error.msg);
      }
    )
  }

  cancelar() {
    this._alerts.confirmation(
      '¿Estás seguro?',
      '',
      'Si estoy seguro',
      'No cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }
}
