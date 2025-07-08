import type { ArriendoFinalizadoType } from "../types/arriendo";

type FilaArriendoFinalizadoProps = {
  index: number;
  arriendo: ArriendoFinalizadoType;
  onBorrar: (arriendoId: number) => void
};

export default function FilaArriendoFinalizado({
  index,
  arriendo,
  onBorrar
}: FilaArriendoFinalizadoProps) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{arriendo.nombreCliente}</td>
      <td>{arriendo.rutCliente}</td>
      <td>{arriendo.tipoVehiculo}</td>
      <td>{arriendo.patenteVehiculo}</td>
      <td>
        <span className="badge bg-secondary-subtle text-dark px-3 py-2 rounded-pill">
          Finalizado
        </span>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm rounded-pill"
          onClick={()=> onBorrar(arriendo.id)}
        >
          <i className="bi bi-trash-fill me-1"></i> Eliminar
        </button>
      </td>
    </tr>
  );
}
