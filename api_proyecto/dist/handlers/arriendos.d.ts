import { Request, Response } from "express";
export declare const getArriendos: (request: Request, response: Response) => Promise<void>;
export declare const crearArriendos: (request: Request, response: Response) => Promise<void>;
export declare const getArriendosConReserva: (request: Request, response: Response) => Promise<void>;
export declare const getArriendosSinReserva: (request: Request, response: Response) => Promise<void>;
export declare const getArriendoById: (request: Request, response: Response) => Promise<void>;
export declare const borrarArriendoById: (request: Request, response: Response) => Promise<void>;
export declare const editarArriendoById: (request: Request, response: Response) => Promise<void>;
