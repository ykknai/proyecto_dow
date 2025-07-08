import {
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router-dom";
import { crearArriendo } from "../services/ArriendoService";
import { useRef } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const resultado = await crearArriendo(formData);
  if (!resultado?.success) {
    return resultado;
  }
  return redirect("/activos");
}

export function loader() {
  const tiposVehiculos: string[] = ["Sedán", "SUV", "Camioneta"];
  return tiposVehiculos;
}

export default function CrearArriendo() {
  const actionData = useActionData() as {
    succes?: boolean;
    error?: string;
    dicErrores?: { [key: string]: string[] };
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const tiposVehiculos = loader();

  const handleReset = () => {
    formRef.current?.reset();
  };

  return (
    <>
      <div className="container my-5" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-5">
          <img
            src="/images/logo.png"
            alt="Logo Empresa"
            className="img-fluid mb-4 "
            style={{ maxWidth: "500px" }}
          />
          <h1 className="mb-3">Bienvenido al sistema de Arriendos</h1>
          <p className="lead">
            Aquí se podrá gestionar los vehiculos, registrar nuevos arriendos y
            consultar por un reporte.
          </p>
          <a
            href="#form"
            className="btn btn-primary btn-lg rounded-pill mt-3"
            data-bs-toggle="collapse"
            aria-controls="form"
          >
            <i className="bi bi-plus-circle me-1"></i> Ingresar Nuevo Arriendo
          </a>
        </div>
        {/* <!-- form --> */}
        <div id="form" className="card shadow mx-auto collapse mt-5 pt-4">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">
              Crear nuevo arriendo
            </h4>
            {/* ERROR MESSAGE */}
            {actionData?.error && (
              <div className="alert alert-danger text-center">
                {actionData?.error}
              </div>
            )}

            <Form method="POST" ref={formRef} className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  name="nombreCliente"
                  type="text"
                  className={`form-control ${
                    actionData?.dicErrores?.nombreCliente ? "is-invalid" : ""
                  }`}
                  id="nombre"
                  required
                />
                {"nombre" in (actionData?.dicErrores || {}) && (
                  <div className="invalid-feedback">
                    {actionData.dicErrores?.nombre[0]}
                  </div>
                )}
                <label htmlFor="patente" className="form-label">
                  Patente
                </label>
                <input
                  name="patenteVehiculo"
                  type="text"
                  className={`form-control ${
                    actionData?.dicErrores?.patenteVehiculo ? "is-invalid" : ""
                  }`}
                  id="patente"
                  required
                />
                {"patenteVehiculo" in (actionData?.dicErrores || {}) && (
                  <div className="invalid-feedback">
                    {actionData.dicErrores?.patenteVehiculo[0]}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="rut" className="form-label">
                  Rut
                </label>
                <input
                  name="rutCliente"
                  type="text"
                  className={`form-control ${
                    actionData?.dicErrores?.rutCliente ? "is-invalid" : ""
                  }`}
                  id="rut"
                  required
                />
                {"rutCliente" in (actionData?.dicErrores || {}) && (
                  <div className="invalid-feedback">
                    {actionData.dicErrores?.rutCliente[0]}
                  </div>
                )}
                <label htmlFor="vehiculo" className="form-label">
                  Tipo Vehiculo
                </label>
                <select
                  name="tipoVehiculo"
                  className={`form-control ${
                    actionData?.dicErrores?.tipoVehiculo ? "is-invalid" : ""
                  }`}
                  id="vehiculo"
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {tiposVehiculos.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                {"tipoVehiculo" in (actionData?.dicErrores || {}) && (
                  <div className="invalid-feedback">
                    {actionData.dicErrores?.tipoVehiculo[0]}
                  </div>
                )}
              </div>
              <div className="col-12 d-grid gap-2 me-auto">
                <button className="btn btn-primary rounded-pill" type="submit">
                  Crear
                </button>
                <button
                  className="btn btn-danger rounded-pill"
                  type="button"
                  onClick={handleReset}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
