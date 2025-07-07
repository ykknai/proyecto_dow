import { Model } from "sequelize-typescript";
declare class Usuario extends Model {
    email: string;
    password: string;
}
export default Usuario;
