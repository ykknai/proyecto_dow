"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordByEmail = exports.cambiarContraseña = exports.crearUsuario = exports.getEmails = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getEmails = async (request, response) => {
    try {
        const emails = await Usuario_1.default.findAll({
            attributes: ['email'],
        });
        response.json({ data: emails });
    }
    catch (error) {
        console.log('Error al mostrar los emails x.x');
        console.log(error);
    }
};
exports.getEmails = getEmails;
const crearUsuario = async (request, response) => {
    const usuarioNuevo = await Usuario_1.default.create(request.body);
    response.json({ data: usuarioNuevo });
};
exports.crearUsuario = crearUsuario;
const cambiarContraseña = async (request, response) => {
    try {
        const { email } = request.params;
        const usuario = await Usuario_1.default.findByPk(email);
        const { newPassword } = request.body;
        if (!usuario) {
            return response.json('Error, Usuario no encontrado x.x');
        }
        if (usuario.password === newPassword) {
            return response.json('Error, la contraseña actual es igual a la anterior x.x');
        }
        if (!newPassword || newPassword.length < 6) {
            return response.json('Error, contraseña no cumple los riquisitos: \n Mínimo 6 caracteres');
        }
        await usuario.update({ password: newPassword });
        await usuario.save();
        response.json('Contraseña cambiada con éxito!');
    }
    catch (error) {
        console.log(`No se logró actualizar la contraseña, ${error}`);
    }
};
exports.cambiarContraseña = cambiarContraseña;
const getPasswordByEmail = async (request, response) => {
    try {
        const { email } = request.params;
        const password = await Usuario_1.default.findByPk(email, {
            attributes: ['password']
        });
        if (!password) {
            response.json('Error 404, no se a encontrado ningun Usuario con ese Email');
        }
        response.json({ data: password });
    }
    catch (error) {
        console.log('Error al mostrar la contraseña x.x');
        console.log(error);
    }
};
exports.getPasswordByEmail = getPasswordByEmail;
//# sourceMappingURL=usuarios.js.map