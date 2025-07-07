"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarArriendoById = exports.borrarArriendoById = exports.getArriendoById = exports.getArriendosSinReserva = exports.getArriendosConReserva = exports.crearArriendos = exports.getArriendos = void 0;
const Arriendo_1 = __importDefault(require("../models/Arriendo"));
const getArriendos = async (request, response) => {
    const arriendos = await Arriendo_1.default.findAll();
    response.json({ data: arriendos });
};
exports.getArriendos = getArriendos;
const crearArriendos = async (request, response) => {
    response.json('Crear arriendo');
};
exports.crearArriendos = crearArriendos;
const getArriendosConReserva = async (request, response) => {
    response.json('Estos son los arriendos con reservas');
};
exports.getArriendosConReserva = getArriendosConReserva;
const getArriendosSinReserva = async (request, response) => {
    response.json('Estos son los arriendos sin reservas');
};
exports.getArriendosSinReserva = getArriendosSinReserva;
const getArriendoById = async (request, response) => {
    const { id } = request.params;
    response.json(`Este es el arriendo con id: ${id}`);
};
exports.getArriendoById = getArriendoById;
const borrarArriendoById = async (request, response) => {
    const { id } = request.params;
    response.json(`Se borro el arriendo con id: ${id}`);
};
exports.borrarArriendoById = borrarArriendoById;
const editarArriendoById = async (request, response) => {
    const { id } = request.params;
    response.json(`Se editó el arriendo con id: ${id}`);
};
exports.editarArriendoById = editarArriendoById;
//# sourceMappingURL=arriendos.js.map