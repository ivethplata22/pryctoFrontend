export interface ClienteRespuesta {
    id_cliente:      number;
    uuid_cliente:    string;
    nombre_cliente:  string;
    email:           string;
    telefono:        string;
    direccion:       string;
    ingreso_mensual: number;
    fecha_registro:  Date;
}

export interface ResponseCliente {
    msg: string;
}

export interface Cliente {
    nombre:         string;
    email:          string;
    telefono:       string;
    direccion:      string;
    ingresomensual: number;
}