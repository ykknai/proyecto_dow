import { Request, Response, NextFunction, request } from "express";
import jwt from 'jsonwebtoken'

export function verificarToken(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        response.status(409).json({ error: 'Error, Token no proporcionado x.x' })
    }

    const token = authHeader.split(' ')[1]
    const secretKey = process.env.SECRET_KEY

    try {
        const decoded = jwt.verify(token, secretKey);
        (request as any).usuario = decoded
        next()
    } catch (error) {
        response.status(405).json({ error: 'Token vencido o expirado' })
        console.log(error)
    }
}