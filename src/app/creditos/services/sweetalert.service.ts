import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  public toastDisplay(icon: 'error' | 'success', toastMessage: string): void {
    
    Swal.fire({
      icon,
      title: toastMessage,
      position: 'top',
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'alert-toast-style',
      },
    });

  }

  public resultAction (icon: 'info' | 'success' | 'error', title: string, text: string, timer: number) {

    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton: false,
      timerProgressBar: true,
      timer
    });

  }

  public createLoading(title: any = 'Procesando los datos', message: any = 'En breve estará listo') {

    Swal.mixin({
      title: title,
      html: message,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton:false,
      willOpen: () => {
        Swal.showLoading()
      }
    });

  }

  public showAfterLoading (icon: 'error' | 'success', title: string = 'Listo!', text: string = 'Los datos se procesaron correctamente') {

    Swal.fire({
      icon,
      title,
      text
    });

  }

  public confirmation (title: string, text: string, confirmButtonText: string, cancelButtonText: string) {

    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#425cc7ff',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      }
    });

  }
  
}