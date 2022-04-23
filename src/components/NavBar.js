import { Logo } from "./Logo"
import { Link } from "./navbar/Link"


export const NavBar = () => {
  
  
  
  return (
    <div className="navbar">
        <Logo dark />
        <div className="nav-links">
          <Link text="Cursos" link="/courses" />
          <Link text="Mi aprendizaje" link="/learning" />
          <Link text="Mi perfil" link="/profile" />
          <Link text="Notificaciones" link="/" />
        </div>
        <h2 className="logout">Cerrar sesión</h2>
    </div>
  )
}
