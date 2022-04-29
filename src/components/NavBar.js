import { useDispatch, useSelector } from "react-redux"
import { Logo } from "./Logo"
import { Link } from "./navbar/Link"
import { startLogout } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";


export const NavBar = () => {

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitLogout = () => {
    dispatch(startLogout());
    navigate("/login");
  }
  

  return (
    <div className="navbar">
      <Logo dark />
      <div className="nav-links">
        {
          user && user.role === 1 ?
          <>
            <Link text="Cursos" link="/student/courses" icon="fa-solid fa-layer-group" />
            <Link text="Mi aprendizaje" link="/student/learning" icon="fa-solid fa-book-open-reader" />
            <Link text="Mi perfil" link="/student/profile" icon="fa-solid fa-user" />
            <Link text="Notificaciones" icon="fa-solid fa-bell" button={true} />
          </> 
          : user && user.role === 2 ?
          <>
            <Link text="Mis cursos" link="/teacher/courses" icon="fa-solid fa-layer-group" />
            <Link text="Mi perfil" link="/teacher/profile" icon="fa-solid fa-user" />
            <Link text="Notificaciones" icon="fa-solid fa-bell" button={true} />
          </>
          : user && user.role === 3 ?
          <>
            <Link text="Dashboard" link="/admin/" icon="fa-solid fa-chart-pie" />
            <Link text="Cursos" link="/admin/courses" icon="fa-solid fa-book-open" />
            <Link text="Profesores" link="/admin/teachers" icon="fa-solid fa-person-chalkboard" />
            <Link text="Mi perfil" link="/admin/profile" icon="fa-solid fa-user" />
          </>
          :
          <>
            <Link text="Cursos" link="/courses" icon="fa-solid fa-layer-group" />
            <Link text="Iniciar sesión" link="/login" icon="fa-solid fa-right-to-bracket" />
            <Link text="Registrarse" link="/register" icon="fa-solid fa-user-plus" />
          </>
        }
      </div>
      {
        user && <h2 className="logout" onClick={submitLogout}>Cerrar sesión</h2>
      }
    </div>
  )
}
