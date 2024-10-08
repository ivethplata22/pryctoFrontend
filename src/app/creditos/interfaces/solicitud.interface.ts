export interface SolicitudRespuesta {
    msg:             string;
    estadoSolicitud: string;
    uuidCliente:     string;
}

export interface SolicitudCompleta {
    nombre:         string;
    email:          string;
    telefono:       string;
    direccion:      string;
    ingresomensual: number;
    id_sucursal:    number;
    monto:          number;
    plazo:          number;
}