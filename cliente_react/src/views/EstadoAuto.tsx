import { useLoaderData } from "react-router-dom";
import { getArriendosActivos } from "../services/ArriendoActivoService";
import type { ArriendoActivoType, ArriendoFinalizadoType } from "../types/arriendo";
import { getArriendosFinalizados } from "../services/ArriendoFinalizadoService";

export async function loader() {
  const [arriendosActivos, arriendosFinalizados] = await Promise.all([
    getArriendosActivos(),
    getArriendosFinalizados(),
  ]);

  return { arriendosActivos, arriendosFinalizados };
}


export default function EstadoAuto() {
   const loaderData = useLoaderData() as {
    arriendosActivos?: ArriendoActivoType[];
    arriendosFinalizados?: ArriendoFinalizadoType[];
  };

  function filtrarActivos(tipo: string, lista: ArriendoActivoType[]){
    const cantidad = lista.filter(arriendo => arriendo.tipoVehiculo === tipo).length;
    return cantidad
  }
  function filtrarFinalizados(tipo: string, lista: ArriendoFinalizadoType[]){
    const cantidad = lista.filter(arriendo => arriendo.tipoVehiculo === tipo).length;
    return cantidad
  }

  const arriendosActivos = loaderData.arriendosActivos ?? [];
  const arriendosFinalizados = loaderData.arriendosFinalizados ?? [];

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <div className="card shadow p-4 text-center">
        <h3 className="text-primary mb-4">
          {/* Estadísticas de Arriendos por Tipo de Vehículo */}
        </h3>
        {/* ARRIENDO DE SEDÁN */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card bg-info bg-opacity-10 border-info shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <i className="bi bi-car-fill text-info display-4 mb-2"></i>
                <h5 className="card-title text-info mb-1">Sedán Arrendados</h5>
                <p className="fs-1 fw-bold text-info">{filtrarActivos("Sedán",arriendosActivos) + filtrarFinalizados("Sedán",arriendosFinalizados)}</p>
                <h6 className="text-muted">Hasta la fecha</h6>
              </div>
            </div>
          </div>
          {/* ARRIENDOS DE SUV */}
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card bg-success bg-opacity-10 border-success shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-success mb-1">
                  SUVs Arrendados
                </h5>
                <p className="fs-1 fw-bold text-success">{filtrarActivos("SUV",arriendosActivos) + filtrarFinalizados("SUV",arriendosFinalizados)}</p>
                <h6 className="text-muted">Hasta la fecha</h6>
              </div>
            </div>
          </div>
          {/* ARRIENDOS DE CAMIONETA */}
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card bg-warning bg-opacity-10 border-warning shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-warning mb-1">
                  Camionetas Arrendadas
                </h5>
                <p className="fs-1 fw-bold text-warning">{filtrarActivos("Camioneta",arriendosActivos) + filtrarFinalizados("Camioneta",arriendosFinalizados)}</p>
                <h6 className="text-muted">Hasta la fecha</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <a href="/" className="btn btn-outline-primary rounded-pill">
            <i className="bi bi-arrow-left-circle me-1"></i> Volver
          </a>
        </div>
      </div>
    </div>
  );
}
