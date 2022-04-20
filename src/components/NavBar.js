import { Logo } from "./Logo"
import { Link } from "./navbar/Link"


export const NavBar = () => {
  
  
  
  return (
    <div className="navbar">
        <Logo dark />
        <div className="nav-links">
          <Link text="Cursos" link="/student/courses" />
          <Link text="Mi aprendizaje" link="/student/learning" />
          <Link text="Mi perfil" link="/student/profile" />
          <Link text="Notificaciones" link="/student/" />
        </div>
        <h2 className="logout">Cerrar sesión</h2>
    </div>
  )
}
