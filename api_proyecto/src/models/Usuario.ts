import { BeforeCreate, Column, DataType, Model, Table } from "sequelize-typescript";
import bcrypt from 'bcrypt'

@Table({ tableName: 'usuarios' })

class Usuario extends Model{
    // Email
    @Column({ type: DataType.STRING(50) , primaryKey: true, allowNull: false , validate: { isEmail: true, notEmpty:true }})
    declare email: string

    @Column({ type: DataType.STRING(60), allowNull: false })
    declare password: string

    @BeforeCreate
    static async hashPassword(usuario: Usuario){
        usuario.password = await bcrypt.hash(usuario.password, 10)
    }
}

export default Usuario