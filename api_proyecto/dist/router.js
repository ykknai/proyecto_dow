"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Se harán las definiciones de los diferentes endpoint a utilizar
const express_1 = require("express");
// Arriendos
const arriendos_1 = require("./handlers/arriendos");
// Usuarios
const usuarios_1 = require("./handlers/usuarios");
const router = (0, express_1.Router)();
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
Siempre que se tengan rutar con variables, colocarlar de las últimas, ya que, express va de arriba hacia abajo viendo que endpoint utilizar, por lo tanto
si se llega a llamar un endpoint con una variable y se está colocando en la ruta el nombre de la ruta que lleva a una funcion distinta a una con parámetros,
express tomará primero la funcion con variables porque asumirá que lo que viene luego es una variable y no una ruta distinta de un endpoint.--------------------------------------------------------------------------------------------------------------------------------------------------------- */
//endpoint(s) para Vehículos
router.get('/arriendos', arriendos_1.getArriendos); // Se vinculará con la funcion que se hizo en el directorio 'handlres'
router.get('/arriendos/con-reserva', arriendos_1.getArriendosConReserva);
router.get('/arriendos/sin-reserva', arriendos_1.getArriendosSinReserva);
router.post('/arriendos', arriendos_1.crearArriendos);
router.get('/arriendos/:id', arriendos_1.getArriendoById);
router.put('/arriendos/:id', arriendos_1.editarArriendoById);
router.delete('/arriendos/:id', arriendos_1.borrarArriendoById);
//enpoint(s) para Usuarios
router.get('/usuarios', usuarios_1.getEmails);
router.get('/usuarios/:email', usuarios_1.getPasswordByEmail);
router.post('/usuarios/', usuarios_1.crearUsuario);
router.put('/usuarios/change-password/:email', usuarios_1.cambiarContraseña);
exports.default = router;
//# sourceMappingURL=router.js.map