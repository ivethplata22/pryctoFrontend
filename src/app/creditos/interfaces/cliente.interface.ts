export interface ClienteRespuesta {
    id_cliente:      number;
    uuid_cliente:    string;
    nombre_cliente:  string;
    email:           string;
    telefono:        string;
    direccion:       string;
    ingreso_mensual: string;
    fecha_registro:  Date;
}