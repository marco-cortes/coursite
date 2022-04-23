import { Logo } from "./Logo"
import { Link } from "./navbar/Link"


export const NavBar = () => {
  
  
  
  return (
    <div className="navbar">
        <Logo dark />
        <div className="nav-links">
          <Link text="Cursos" link="/courses" icon="fa-solid fa-layer-group" />
          <Link text="Mi aprendizaje" link="/learning" icon="fa-solid fa-book-open-reader" />
          <Link text="Mi perfil" link="/profile" icon="fa-solid fa-user" />
          <Link text="Notificaciones" link="/" icon="fa-solid fa-bell" />
        </div>
        <h2 className="logout">Cerrar sesión</h2>
    </div>
  )
}
