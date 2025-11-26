import { Main } from "./pages/Main";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <>
    <NavLink className="btn btn-primary" to="/">Fö menü</NavLink>
      <NavLink className="btn btn-primary" to="/posts">
        Blogok megtekintése
      </NavLink>
      <NavLink className="btn btn-primary" to="/new">
        Blogok létrehozása
      </NavLink>
      <Outlet></Outlet>
    </>
  );
}

export default App;
