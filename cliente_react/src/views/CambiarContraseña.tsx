import {
    Form,
    redirect,
    useActionData,
    type ActionFunctionArgs,
} from "react-router-dom";
import { cambiarPassword } from "../services/UsuarioService";
import { useRef } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const resultado = await cambiarPassword(formData);
  if (!resultado?.success) {
    return resultado;
  }
  return redirect("/");
}


export default function CambiarContraseña(){
    const actionData = useActionData() as {
    success?: boolean;
    error?: string;
    dicErrores?: { [key: string]: string[] };
    };
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleReset = () => {
        formRef.current?.reset();
    };
    return(
        <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                {/* <!-- CARD --> */}
                <div className="card shadow-lg rounded-4 p-3">
                    <div className="card-body">
                        {/* <!-- IMAGEN --> */}
                        <div className=" text-center mb-4 ">
                            <img src="/images/logo.png" alt="Logo Empresa" className="img-fluid" style={{ maxWidth: '250px' }} />
                            <h4 className="mt-2">Cambiar Contraseña</h4>
                        </div> 
                        {/* ERROR MESSAGE */}
                        {actionData?.error && (
                            <div className="alert alert-danger text-center">
                            {actionData?.error}
                            </div>
                        )}
                        {/* <!-- FORMULARIO --> */}
                        <Form method="POST" ref={formRef} className="row g-3 ">
                            <div className="mb-3">
                                <label htmlFor="actualP" className="form-label">Contraseña Actual</label>
                                <input type="password" name="actualP" className={`form-control ${actionData?.dicErrores?.actualP ? "is-invalid" : ""}`} 
                                    id="actualP" required 
                                    data-bs-toggle="tooltip" data-bs-placement="right" title="Por favor ingresar contraseña actual"/>
                                    {"actualP" in (actionData?.dicErrores || {}) && (
                                        <div className="invalid-feedback">
                                        {actionData.dicErrores?.actualP[0]}
                                        </div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nuevaP" className="form-label">Nueva Contraseña</label>
                                <input type="password" name="nuevaP" className={`form-control ${actionData?.dicErrores?.nuevaP ? "is-invalid" : ""}`} 
                                    id="nuevaP" required
                                    data-bs-toggle="tooltip" data-bs-placement="right" title="Minimo 6 caracteres"/>
                                    {"nuevaP" in (actionData?.dicErrores || {}) && (
                                        <div className="invalid-feedback">
                                        {actionData.dicErrores?.nuevaP[0]}
                                        </div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmarP" className="form-label">Repetir Contraseña</label>
                                <input type="password" name="confirmarP" className={`form-control ${actionData?.dicErrores?.confirmarP ? "is-invalid" : ""}`} 
                                    id="confirmarP" required
                                    data-bs-toggle="tooltip" data-bs-placement="right" title="Minimo 6 caracteres"/>
                                    {"confirmarP" in (actionData?.dicErrores || {}) && (
                                        <div className="invalid-feedback">
                                        {actionData.dicErrores?.confirmarP[0]}
                                        </div>
                                    )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg rounded-pill">Cambiar
                                    Contraseña</button>
                            </div>
                            <div className="text-center">
                                <a href="/" className="text-decoration-none" onClick={handleReset} >Volver</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}