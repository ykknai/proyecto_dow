import Express from "express"
import router from './router'
import db from "./config/database"
import cors, { CorsOptions } from 'cors'


const server = Express()

//Conectar a la BD
async function conectarBD(){
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion con la BD exitosa!')
    } catch (error) {
        console.log('Error al intentar conectar la BD')
        console.log(error)
    }
}

// Todos los request pasan por 'server.use()'

conectarBD() //Conectando la BD

// Habilitar CORS para conectar con cliente
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        // '!origin' solo para ir porvando con POSTMAN -> sacar despues de tener todo OK.
        if(!origin || origin === process.env.FRONTEND_URL){
            // Permitir
            callback(null, true)
            // Espacio para error, se permite acceso.
        }else{
            callback(new Error('Error  de CORS'), false)
            // Error al acceder
        }
    }
}

server.use(cors(corsOptions))

// Habilitar los archivos .json que se envien desde el cliente
server.use(Express.json())

// Todos los endpoint que comiencen con '/api' serán manejados por router.
server.use('/api', router)

export default server