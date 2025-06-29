import { Request, Response } from "express";
import Arriendo from "../models/Arriendo";
import { Op } from "sequelize";

/*  
    Listar Arriendos               | y
    Crear/Borrar Arriendo          | y
    Registrar Devolicion Arriendo  | y
*/

export const crearArriendo = async(request : Request , response : Response)=>{
    try {
        const { datosArriendo } = request.body

        if (!datosArriendo) {
            response.json('Error, hay contenido vacío x.x')
        }else{
            const arriendoData = {
                ...datosArriendo,
                fechaInicio: new Date().toISOString().split('T')[0],
                fechaFin: null
            };
    
            const nuevoArriendo = await Arriendo.create(arriendoData)
            
            response.json({ data: nuevoArriendo })
            console.log('Se ha creado un arriendo exitosamente !')}

    } catch (error) {
        response.json('Error, no se pudo crear el arriendo x.x')
        console.log(error)
    }
}

export const borrarArriendo = async(request : Request , response : Response)=>{
    try {
        const { id } = request.params
        const arriendo = await Arriendo.findByPk(id)

        if(!arriendo){
            response.json('Error, el arriendo a eliminar no existe x.x')
        }

        if(!arriendo.fechaFin){
            response.json('Error, el arriendo no ha finalizado aun x.x')
        }else{
            await arriendo.destroy()
            response.json({ data: 'Arriendo eliminado con éxito !' }) 
        }
    } catch (error) {
        response.json('Error, no se logró eliminar el arriendo x.x')
        console.log(error)
    }
}

export const registrarDevolucion = async(request : Request , response: Response)=>{
    try {
        const { id } = request.params
        const arriendo = await Arriendo.findByPk(id)
        if(!arriendo){
            response.json('No existe el arriendo')
        }

        if(arriendo.fechaFin){
            response.json('Error, arriendo ya devuelto x.x')
        }

        const fechaDevolucion = new Date().toISOString().split('T')[0]
        await arriendo.update({ fechaFin : fechaDevolucion})
        response.json({ data: arriendo })
        console.log('El arriendo se ha devolucionado exitosamente !')
    } catch (error) {
        response.json('Hubo un error al devolicionar x.x')
        console.log(error)
    }
}

export const arriendosActivos = async(request : Request , response: Response)=>{
    try {
        const activos = await Arriendo.findAll({
            where: { fechaFin : null},
            attributes: [
                'id', 
                'fechaInicio', 
                'fechaFin', 
                'tipoVehiculo' ,
                'nombreCliente'
            ],
        })

        if(!activos || activos.length === 0){
            response.status(505).json({ error: 'No hay arriendos disponibles' })
        }

        response.status(200).json({ data: activos })

    } catch (error) {
        response.status(500).json({ error: 'Error interno x.x' })
        console.log(500)
    }
}

export const arriendosFinalizados = async(request : Request , response: Response)=>{
    try {
        const activos = await Arriendo.findAll({
            where: { fechaFin: { [Op.not]: null } },
            attributes: [
                'id', 
                'fechaInicio', 
                'fechaFin', 
                'tipoVehiculo' ,
                'nombreCliente'
            ],
        })

        if(!activos || activos.length === 0){
            response.status(505).json({ error: 'No hay arriendos disponibles' })
        }

        response.status(200).json({ data: activos })

    } catch (error) {
        response.status(500).json({ error: 'Error interno x.x' })
        console.log(500)
    }
}

