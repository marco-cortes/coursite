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
        <Link text="Cursos" link="/courses" icon="fa-solid fa-layer-group" />
        {
          user ?
          <>
            <Link text="Mi aprendizaje" link="/learning" icon="fa-solid fa-book-open-reader" />
            <Link text="Mi perfil" link="/profile" icon="fa-solid fa-user" />
            <Link text="Notificaciones" icon="fa-solid fa-bell" button={true} />
          </> 
          :
          <>
          
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
