import type { ArriendoActivoType } from "../types/arriendo";

type FilaArriendoActivoProps = {
  index: number;
  arriendo: ArriendoActivoType;
  onFinalizar: (arriendoId: number) => void;
};

export default function FilaArriendoActivo({
  index,
  arriendo,
  onFinalizar
}: FilaArriendoActivoProps) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{arriendo.nombreCliente}</td>
      <td>{arriendo.rutCliente}</td>
      <td>{arriendo.tipoVehiculo}</td>
      <td>{arriendo.patenteVehiculo}</td>
      <td>
        <span className="badge bg-success">Activo</span>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm rounded-pill"
          onClick={() => onFinalizar(arriendo.id)}
        >
          <i className="bi bi-x-circle-fill me-1"></i>Finalizar Arriendo
        </button>
      </td>
    </tr>
  );
}
