import {
  array,
  maxLength,
  minLength,
  nonEmpty,
  number,
  object,
  pipe,
  string,
  toUpperCase,
  type InferOutput,
} from "valibot";

// Schema para validar la data !
export const ArriendoFinalizadoSchema = object({
  id: number(),
  patenteVehiculo: string(),
  tipoVehiculo: string(),
  rutCliente: string(),
  nombreCliente: string(),
});

// Creando lista de los distintos arriendos finalizados
export const ArriendosFinalizadosSchema = array(ArriendoFinalizadoSchema);

// Type pa ir verificando "modo de programación"
export type ArriendoFinalizadoType = InferOutput<
  typeof ArriendoFinalizadoSchema
>;

export const ArriendoActivoSchema = object({
  id: number(),
  patenteVehiculo: string(),
  tipoVehiculo: string(),
  rutCliente: string(),
  nombreCliente: string(),
});

export const ArriendosActivosSchema = array(ArriendoActivoSchema);

export type ArriendoActivoType = InferOutput<typeof ArriendoActivoSchema>;

export const ArriendoFormSchema = object({
  nombreCliente: pipe(string(), nonEmpty("Indique el nombre del cliente.")),
  rutCliente: pipe(
    string(),
    nonEmpty("Indique el rut sin puntos y con guion."),
    minLength(10, "Rut minimo 10 caracteres"),
    maxLength(10, "Rut no más de 10 caracteres.")
  ),
  patenteVehiculo: pipe(
    string(),
    nonEmpty("Indique la patente del vehiculo sin guion."),
    minLength(6, "Patente mínimo 6 caracteres. 4 letras 2 numeros."),
    maxLength(6, "Patente no más de 6 caracteres."),
    toUpperCase(),
  ),
  tipoVehiculo: pipe(string(), nonEmpty("Indique el tipo de vehículo.")),
});
