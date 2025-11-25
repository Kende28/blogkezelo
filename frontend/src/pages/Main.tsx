import { NavLink, Outlet } from "react-router";

export function Main() {
    return <>
        <div className='container col-sm-12'>
            <h1>Blogkezelő</h1>
            <p>Blogokat ír ki és ad hozzá</p>
            <NavLink className="btn btn-primary" to="/posts">Blogok megtekintése</NavLink>
            <NavLink className="btn btn-primary" to="/new">Blogok létrehozása</NavLink>
            <Outlet></Outlet>
        </div>
    </>
}