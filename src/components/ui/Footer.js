import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <div className="footer">
            <Link to={"/"} className="header-logo">
                <span className="t3">Cour</span>
                <span className="t4">site</span>
            </Link>
            <p className="text-gray">Todos los derechos reservados</p>
            <Link to={"/teacher/register"} className="text-gray">¿Quieres enseñar?</Link>
        </div>
    )
}
