// Se harán las definiciones de los diferentes endpoint a utilizar
import { Router } from "express";
// Arriendos
import {
  arriendosActivos,
  arriendosFinalizados,
  borrarArriendo,
  crearArriendo,
  registrarDevolucion,
} from "./handlers/arriendos";
// Usuarios
import {
  cambiarPassword,
  crearUsuario,
  iniciarSesion,
} from "./handlers/usuarios";
// Middleware
import { verificarToken } from "./middleware/verificarToken";

const router = Router();

router.post("/usuarios/login", iniciarSesion); // Listo
router.post("/usuarios/register", crearUsuario); // Listo

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
Siempre que se tengan rutar con variables, colocarlar de las últimas, ya que, express va de arriba hacia abajo viendo que endpoint utilizar, por lo tanto
si se llega a llamar un endpoint con una variable y se está colocando en la ruta el nombre de la ruta que lleva a una funcion distinta a una con parámetros,
express tomará primero la funcion con variables porque asumirá que lo que viene luego es una variable y no una ruta distinta de un endpoint.--------------------------------------------------------------------------------------------------------------------------------------------------------- */
// Middleware use
// router.use(verificarToken)

//endpoint(s) para Arriendos
router.post("/arriendos", crearArriendo); // Listo
router.put("/arriendos/devolucion/:id", registrarDevolucion); // Listo
router.delete("/arriendos/:id", borrarArriendo); // Listo
router.get("/arriendos/activos", arriendosActivos); // Listo
router.get("/arriendos/finalizados", arriendosFinalizados); // Listo

//enpoint(s) para Usuarios
router.put("/usuarios", cambiarPassword); //Listo

export default router;
