import { Model } from "sequelize-typescript";
declare class Arriendo extends Model {
    id: number;
    fechaInicio: Date;
    fechaFin: Date;
    patenteVehiculo: string;
    tipoVehiculo: string;
    rutCliente: string;
    nombreCliente: string;
}
export default Arriendo;
