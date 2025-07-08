import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import CrearArriendo, { action as actionArriendo } from "./views/CrearArriendo";
import CambiarContraseña, {
  action as actionCambiar,
} from "./views/CambiarContraseña";
import EstadoAuto, { loader as loaderVehiculos } from "./views/EstadoAuto";
import LoginUser, { action as actionLogin } from "./views/LoginUser";
import CrearUser, { action as actionRegister } from "./views/CrearUser";
import ArriendosActivos, {
  loader as loaderActivos,
} from "./views/ArriendosActivos";
import ArriendosFinalizados, {
  loader as loaderFinalizados,
} from "./views/ArriendosFinalizados";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    HydrateFallback: Loader,
    action: actionLogin,
    element: <LoginUser />,
  },
  {
    path: "/signUp",
    HydrateFallback: Loader,
    action: actionRegister,
    element: <CrearUser />,
  },
  {
    path: "/",
    HydrateFallback: Loader,
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            action: actionArriendo,
            element: <CrearArriendo />,
          },
          {
            path: "cambiar",
            action: actionCambiar,
            element: <CambiarContraseña />,
          },
          {
            path: "estados",
            loader: loaderVehiculos,
            element: <EstadoAuto />,
          },
          {
            path: "activos",
            element: <ArriendosActivos />,
            loader: loaderActivos,
          },
          {
            path: "finalizados",
            element: <ArriendosFinalizados />,
            loader: loaderFinalizados,
          },
        ],
      },
    ],
  },
]);
