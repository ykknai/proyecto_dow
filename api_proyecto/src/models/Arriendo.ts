// Para poder trabajar con la tabla de la BD en el cod.
import { Table , Model, Column, DataType, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: 'arriendos' })

class Arriendo extends Model{
    // Definir columna
    @AutoIncrement // Hacerlo autoincrementarse
    @Column({ type: DataType.INTEGER , primaryKey: true, allowNull: false })
    declare id: number

    @Column({ type: DataType.DATEONLY , field: 'fecha_inicio'})
    declare fechaInicio: Date

    @Column({ type: DataType.DATEONLY , field: 'fecha_fin' })
    declare fechaFin: Date

    @Column({type: DataType.STRING(6), field: 'patente_vehiculo'})
    declare patenteVehiculo: string

    @Column({type: DataType.STRING(20), field: 'tipo_vehiculo'})
    declare tipoVehiculo: string

    @Column({type: DataType.STRING(10), field: 'rut_cliente'})
    declare rutCliente: string

    @Column({type: DataType.STRING(50), field: 'nombre_cliente'})
    declare nombreCliente: string
}

export default Arriendo