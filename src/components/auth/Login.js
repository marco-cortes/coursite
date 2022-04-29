import { Logo } from "../Logo"
import img from "../../image/login.svg";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin } from "../../redux/actions/auth";

export const Login = () => {

  const [login, setLogin] = useForm({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(login.email, login.password));
  }

  return (
    <div className="auth-container animate__animated animate__fadeIn">
      <div className="auth-image-container">
        <div className="auth-logo">
          <Logo />
        </div>
        <img src={img} alt="" className="auth-image" />
      </div>
      <form className="auth-form-container" onSubmit={handleLogin}>
        <div className="auth-form-content">
          <h2 className="auth-title">Iniciar sesión</h2>
          <label className="auth-label">Correo:</label>
          <div className="auth-input-div">
            <i className="fa-solid fa-at auth-icon"></i>
            <input className="auth-input" placeholder="Ejemplo: abc@email.com" type="email" name="email" value={login.email} onChange={setLogin} required />
          </div>
          <label className="auth-label">Tu contraseña:</label>
          <div className="auth-input-div">
            <i className="fa-solid fa-lock auth-icon"></i>
            <input className="auth-input" placeholder="Tu contraseña aquí" type="password" name="password" value={login.password} onChange={setLogin} required/>
          </div>
          <button className="btn auth-btn">Iniciar sesión</button>
        </div>
        <div className="auth-help-container">
          <p className="auth-help">¿No tienes cuenta?</p>
          <Link to="/register" className="auth-help-link">Registrate</Link>
        </div>
      </form>
    </div>
  )
}
