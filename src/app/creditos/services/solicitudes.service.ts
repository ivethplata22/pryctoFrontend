import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../interfaces/sucursales.interface';
import { Indicadores, RespuestaSolicitudesSimulacion, SolicitudCompleta, SolicitudesRespuestaArray, SolicitudesSimulacion, SolicitudRespuesta } from '../interfaces/solicitud.interface';
import { ClienteRespuesta, ResponseCliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService implements OnInit {
  // Variables Globales
  private apiBackend: string = environment.apiBackend;
  private appToken: string = environment.appToken;

  private UUIDCliente: string = '';
  private cliente: ClienteRespuesta | undefined = undefined;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerLocalStorage();
  }

  obtenerLocalStorage() {
    const localUUIDCliente = localStorage.getItem('UUIDCliente');
    const localCliente = localStorage.getItem('clienteService');

    if(localUUIDCliente) {
      this.UUIDCliente = localUUIDCliente;
    }

    if(localCliente) {
      this.cliente = JSON.parse(localCliente);
    }
  }

  // Headers de la peticiones
  private getOptions() {
    const headers = new HttpHeaders({
      'apptoken': this.appToken,
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

  // Obtener cliente por UUID
  public obtenerClienteUUID(UUID: string): Observable<ClienteRespuesta> {
    const options = this.getOptions();
    return this.http.get<ClienteRespuesta>(`${this.apiBackend}/b/cliente/${UUID}`, options);
  }

  // Crear una solicitud - Información solicitud
  public crearSolicitud(uuidcliente: string, id_sucursal: number, monto: number, plazo: number): Observable<SolicitudRespuesta> {
    const options = this.getOptions();
    const body = {
      uuidcliente,
      id_sucursal,
      monto,
      plazo
    };
    return this.http.post<SolicitudRespuesta>(`${this.apiBackend}/b/solicitudCredito`, body, options);
  }

  // Obtener solicitudes por Cliente ID
  public obtenerSolicitudesClienteID(id_cliente: number): Observable<SolicitudesRespuestaArray[]> {
    const options = this.getOptions();
    return this.http.get<SolicitudesRespuestaArray[]>(`${this.apiBackend}/b/solicitudes/${id_cliente}`, options);
  }

  // Actualizar Cliente
  public actualizarCliente(id_cliente: number, nombre: string, email: string, telefono: string, direccion: string, ingresomensual: number): Observable<ResponseCliente> {
    const options = this.getOptions();
    const body = {
      id_cliente,
      nombre,
      email,
      telefono,
      direccion,
      ingresomensual
    };
    return this.http.put<ResponseCliente>(`${this.apiBackend}/b/actualizar/${id_cliente}`, body, options);
  }

  // Simular Varias Solicitudes de Credito
  public simularSolicitudes(): Observable<RespuestaSolicitudesSimulacion> {
    const solicitudes: SolicitudesSimulacion[] = [
      {
        "nombre": "Perdona 1",
        "email": "correo1@outlook.es",
        "telefono": "5574837465",
        "direccion": "Direccion1",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 300,
        "plazo": 1
      },
      {
        "nombre": "Persona 2",
        "email": "correo2@outlook.es",
        "telefono": "5584736454",
        "direccion": "Direccion2",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 50000,
        "plazo": 25
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      },
      {
        "nombre": "Persona 3",
        "email": "correo3@outlook.es",
        "telefono": "5584756473",
        "direccion": "Direccion3",
        "ingresomensual": 10000,
        "id_sucursal": 1,
        "monto": 9000,
        "plazo": 7
      }
    ];
    const options = this.getOptions();
    const body = {
      solicitudes
    };
    return this.http.post<RespuestaSolicitudesSimulacion>(`${this.apiBackend}/b/solicitudesCredito`, body, options);
  }

  // Obtener solicitudes por Cliente ID
  public indicadoresSolicitudes(): Observable<Indicadores> {
    const options = this.getOptions();
    return this.http.get<Indicadores>(`${this.apiBackend}/b/indicadores`, options);
  }

  // FUNCIONES

  setUUIDCliente(UUIDCliente: string) {
    this.UUIDCliente = UUIDCliente;
    localStorage.setItem('UUIDCliente', this.UUIDCliente);
  }

  setCliente(cliente: ClienteRespuesta | undefined) {
    this.cliente = cliente;
    localStorage.setItem('clienteService', JSON.stringify(this.cliente));
  }

  getUUIDCliente(): string {
    this.obtenerLocalStorage();
    return this.UUIDCliente;
  }

  getCliente(): ClienteRespuesta | undefined {
    this.obtenerLocalStorage();
    return this.cliente;
  }
}