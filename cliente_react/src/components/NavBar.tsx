import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-primary-subtle"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.png"
            className="img-fluid"
            alt="Logo Empresa"
            width="200"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <!-- MENU  --> */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Inicio
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Arriendos
              </a>
              <ul className="dropdown-menu ">
                <li>
                  <a className="dropdown-item" href="activos">
                    Activos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="finalizados">
                    Finalizados
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="estados">
                Reporte
              </a>
            </li>
          </ul>
          {/* <!-- Botones navbar --> */}
          <div className="d-none d-lg-flex gap-2">
            <a href="cambiar">
              <button className="btn btn-outline-success" type="button">
                Cambiar Contraseña
                <i className="bi bi-person-fill-lock"></i>
              </button>
            </a>
            <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
                <i className="bi bi-box-arrow-in-right"></i>
              </button>
          </div>
          {/* <!-- Botones hamburguesa --> */}
          <div className="d-flex d-lg-none flex-column gap-2 mt-3">
            <Link to="/cambiar">
              <button className="btn btn-outline-success" type="button">
                Cambiar Contraseña
                <i className="bi bi-person-fill-lock"></i>
              </button>
            </Link>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
                <i className="bi bi-box-arrow-in-right"></i>
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
