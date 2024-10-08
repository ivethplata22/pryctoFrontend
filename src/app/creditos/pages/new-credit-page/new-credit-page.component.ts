import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-new-credit-page',
  templateUrl: './new-credit-page.component.html',
  styleUrl: './new-credit-page.component.css'
})
export class NewCreditPageComponent {
  public datosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _alerts: SweetAlertService
  ) {
    this.datosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: ['', [Validators.required]],
      ingreso: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.min(0.01)]]
    });
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

    localStorage.setItem('cliente', JSON.stringify(cliente));

    this._alerts.toastDisplay('success', 'Datos guardados correctamente');
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
