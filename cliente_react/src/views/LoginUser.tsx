import {
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router-dom";
import { iniciarSesion } from "../services/UsuarioService";
import { useRef } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const resultado = await iniciarSesion(formData);
  if (!resultado?.success) {
    return resultado;
  }
  return redirect("/");
}

export default function LoginUser() {
  const actionData = useActionData() as {
    success?: boolean;
    error?: string;
    dicErrores?: { [key: string]: string[] };
  };
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleReset = () => {
    formRef.current?.reset();
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          {/* <!-- CARD --> */}
          <div className="card shadow-lg rounded-4 p-3 mx-auto">
            <div className="card-body">
              {/* <!-- IMAGEN --> */}
              <div className=" text-center mb-4 ">
                <img
                  src="/images/logo.png"
                  alt="Logo Empresa"
                  className="img-fluid"
                  style={{ maxWidth: "250px" }}
                />
                <h4 className="mt-2">Iniciar sesión</h4>
              </div>
              {/* ERROR MESSAGE */}
              {actionData?.error && (
                <div className="alert alert-danger text-center">
                  {actionData?.error}
                </div>
              )}
              {/* <!-- FORMULARIO --> */}
              <Form method="POST" ref={formRef}>
                {/* <!-- EMAIL --> */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      actionData?.dicErrores?.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Email"
                  />
                  {"email" in (actionData?.dicErrores || {}) && (
                    <div className="invalid-feedback">
                      {actionData.dicErrores?.email[0]}
                    </div>
                  )}
                </div>
                {/* <!-- PASSWORD --> */}
                <div className="mb-3">
                  <label htmlFor="contraseña" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${
                      actionData?.dicErrores?.password ? "is-invalid" : ""
                    }`}
                    id="contraseña"
                    placeholder="*******"
                  />
                  {"password" in (actionData?.dicErrores || {}) && (
                    <div className="invalid-feedback">
                      {actionData.dicErrores?.password[0]}
                    </div>
                  )}
                </div>
                {/* <!-- BOTON --> */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill"
                  >
                    Entrar
                  </button>
                </div>
                {/* <!-- CREAR CUENTA --> */}
                <div className="text-center ms-2 mt-3">
                  <a
                    href="signUp"
                    className="text-decoration-none"
                    onClick={handleReset}
                  >
                    Crear Cuenta
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
