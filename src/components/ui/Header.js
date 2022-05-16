import { Link, NavLink } from "react-router-dom"

export const Header = () => {

    const linkActive = (isActive) => {
        return "header-link " + (isActive ? "header-link-active" : "");
    }

    return (
        <div className="header">
            <Link to={"/"} className="header-logo">
                <span className="t1">Cour</span>
                <span className="t2">site</span>
            </Link>
            <div className="header-links">
                <NavLink to={"/"} className={({ isActive }) => linkActive(isActive)}>Inicio</NavLink>
                <NavLink to={"/about"} className={({ isActive }) => linkActive(isActive)}>Acerca de</NavLink>
                <NavLink to={"/services"} className={({ isActive }) => linkActive(isActive)}>Servicios</NavLink>
                <Link to={"/login"} className="header-link header-auth">Iniciar sesión</Link>
                <Link to={"/register"} className="header-link header-auth header-auth-focus">Registrarse</Link>
            </div>
        </div>
    )
}
