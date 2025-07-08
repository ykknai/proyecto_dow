import { Request, Response } from 'express'
import Usuario from "../models/Usuario"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/*  
    Crear Usuarios                 | y
    Iniciar sesion                 | y
    Cambiar contraseña             | y
*/

export const crearUsuario = async(request: Request , response: Response) =>{
    const { email, password } = request.body
    if(!email || !password){
        response.status(401).json({ error: 'Error, email y password son necesarias !!' })
    }else{
        if(password.length < 6){
            response.status(404).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" });
        }else{
            try {
            const usuario = await Usuario.findByPk(email)

            if(usuario){
                response.status(402).json({ error: 'Error, el usuario ya está registrado en la Base de Datos x.x' })
            }else{
                const newUsuario = await Usuario.create({ email, password })
                response.status(200).json({ msg: 'Usuario creado con éxito !' })
            }            
            } catch (error) {
                console.log('Error, no se logró crear el usuario x.x')
                response.status(500).json({ error: 'Error interno x.x' })
            }
        }
    }
}


export const cambiarPassword = async (request: Request, response: Response) => {
    const { actualP, nuevaP, confirmarP } = request.body
    
    if (!actualP || !nuevaP || !confirmarP) {
        response.status(400).json({ error: "Todos los campos son obligatorios" })
    } else {
        if (nuevaP !== confirmarP) {
        response.status(400).json({ error: "La nueva contraseña no coincide con la confirmación" })
        } else {
            if (nuevaP.length < 6){
                response.status(404).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" })
            }else{
                const email = (request as any).usuario.email // se saca el email(PK) desde el middleware
        
                try {
                    const usuario = await Usuario.findByPk(email)
            
                    if (!usuario) {
                        response.status(404).json({ error: "Error, Usuario no encontrado x.x" })
                    } else {
                        if (!bcrypt.compareSync(actualP, usuario.password)) {
                        response.status(401).json({ error: "Error, La contraseña actual es incorrecta x.x" })
                        } else {
                            const nuevaPHash = await bcrypt.hash(nuevaP, 10) // La contraseña nueva se pasa a hash
                            usuario.password = nuevaPHash // se cambia directamente el campo password
                            await usuario.save() // se guardan los cambios en la Bd
                            response.status(200).json({ mensaje: "Contraseña actualizada exitosamente !!" })
                        }
                    }
            
                } catch (error) {
                    console.log('No se logró actualizar la contraseña x.x')
                    response.status(500).json({ error: "Error interno del servidor" })
                }
            }   
        }
    }
}    

export const iniciarSesion = async(request: Request , response: Response) =>{
        const { email, password } = request.body
        const secretKey = process.env.SECRET_KEY
    try {
        const usuario = await Usuario.findByPk(email)

        if(!usuario || !bcrypt.compareSync( password, usuario.password )){
            response.status(400).json('Error. Las credenciales no son correctas x.x')
        }

        const token = jwt.sign({ email: usuario.email }, secretKey,{ expiresIn: '1h' })
        response.json({ token })

    } catch (error) {
        console.error('Error al iniciar sesión x.x ', error)
        response.status(500).json({ error : 'Error interno x.x'})
    }
}