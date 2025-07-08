import { useLoaderData } from "react-router-dom";
import {
  finalizarArriendo,
  getArriendosActivos,
} from "../services/ArriendoActivoService";
import type { ArriendoActivoType } from "../types/arriendo";
import { useState } from "react";
import FilaArriendoActivo from "../components/FilaArriendoActivo";

export async function loader() {
  const arriendos = await getArriendosActivos();
  return arriendos;
}

export default function ArriendosActivos() {
  let arriendosInicio = useLoaderData() as ArriendoActivoType[];
  if (!arriendosInicio) {
    arriendosInicio = [];
  }
  const [arriendos, setArriendos] = useState(arriendosInicio);

  const handleFinalizar = async (arriendoId: number) => {
    await finalizarArriendo(arriendoId);
    setArriendos(arriendos.filter((arriendo) => arriendo.id !== arriendoId));
  };
  return (
    <div className="container my-5">
      <div className="card card-center shadow p-4">
        <h3 className="card-title text-center text-primary fw-bold mb-4">
          Lista de Arriendos Activos
        </h3>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>RUT</th>
                <th>Vehículo</th>
                <th>Patente</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {arriendos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                    No hay arriendos finalizados aún.
                  </td>
                </tr>
              ) : (
                arriendos.map((arriendo, index) => (
                  <FilaArriendoActivo
                    key={arriendo.id}
                    index={index}
                    arriendo={arriendo}
                    onFinalizar={handleFinalizar}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <a href="/" className="btn btn-danger mt-3 rounded-pill">
        <i className="bi bi-arrow-left-circle me-1"></i> Volver al inicio
      </a>
    </div>
  );
}
