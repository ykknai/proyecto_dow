"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const database_1 = __importDefault(require("./config/database"));
const server = (0, express_1.default)();
//Conectar a la BD
async function conectarBD() {
    try {
        await database_1.default.authenticate();
        database_1.default.sync();
        console.log('Conexion con la BD exitosa!');
    }
    catch (error) {
        console.log('Error al intentar conectar la BD');
        console.log(error);
    }
}
conectarBD(); //Conectando la BD
// Habilitar los archivos .json que se envien desde el cliente
server.use(express_1.default.json());
// Todos los endpoint que comiencen con '/api' serán manejados por router.
server.use('/api', router_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map