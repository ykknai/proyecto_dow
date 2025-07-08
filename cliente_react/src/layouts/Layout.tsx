import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* CONTENIDO PRINCIPAL DE LA PAGINA */}
      <main className="container-fluid">
        <Outlet />
      </main>
    </>
  );
}
