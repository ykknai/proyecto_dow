import { Request, Response } from 'express';
export declare const getEmails: (request: Request, response: Response) => Promise<void>;
export declare const crearUsuario: (request: Request, response: Response) => Promise<void>;
export declare const cambiarContraseña: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPasswordByEmail: (request: Request, response: Response) => Promise<void>;
