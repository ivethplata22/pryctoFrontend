import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../interfaces/sucursales.interface';
import { SolicitudCompleta, SolicitudRespuesta } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  // Variables Globales
  private apiBackend: string = environment.apiBackend;
  private appToken: string = environment.appToken;

  public UUIDCliente: string = '';

  constructor(
    private http: HttpClient
  ) {}

  // Headers de la peticiones
  private getOptions() {
    const headers = new HttpHeaders({
      'apptoken': this.appToken
    });
    return { headers: headers };
  }

  // Obtener sucursales
  public obtenerSucursales(): Observable<Sucursal[]> {
    const options = this.getOptions();
    return this.http.get<Sucursal[]>(`${this.apiBackend}/b/sucursales`, options);
  }

  // Crear una solicitud - Información completa
  public crearSolicitudCompleta(solicitud: SolicitudCompleta): Observable<SolicitudRespuesta> {
    const options = this.getOptions();
    const body = {
      nombre: solicitud.nombre,
      email: solicitud.email,
      telefono: solicitud.telefono,
      direccion: solicitud.direccion,
      ingresomensual: solicitud.ingresomensual,
      id_sucursal: solicitud.id_sucursal,
      monto: solicitud.monto,
      plazo: solicitud.plazo
    };
    return this.http.post<SolicitudRespuesta>(`${this.apiBackend}/b/solicitudCreditoCompleto`, body, options);
  }
}