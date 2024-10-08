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

export interface SolicitudesRespuestaArray {
    id_solicitud:     number;
    monto_solicitado: string;
    plazo_meses:      number;
    tasa_interes:     string;
    estado_solicitud: string;
    fecha_solicitud:  Date;
    fecha_respuesta:  Date;
    id_sucursal:      number;
    nombre_sucursal:  string;
    direccion:        string;
    telefono:         string;
    gerente_sucursal: string;
}

export interface SolicitudesSimulacion {
    nombre:         string;
    email:          string;
    telefono:       string;
    direccion:      string;
    ingresomensual: number;
    id_sucursal:    number;
    monto:          number;
    plazo:          number;
}

export interface RespuestaSolicitudesSimulacion {
    msg:        string;
    resultados: Resultado[];
}

export interface Resultado {
    id_cliente:      number;
    estadoSolicitud: string;
}