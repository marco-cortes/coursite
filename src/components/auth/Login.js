import { Logo } from "../Logo"
import img from "../../image/login.svg";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin } from "../../redux/actions/auth";
import { useState } from "react";
import { Loading } from "../ui/Loading";

export const Login = () => {

  const [loading, setLoading] = useState(false);


  const [login, setLogin] = useForm({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(startLogin(login.email, login.password, setLoading));
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
            <input className="auth-input" placeholder="Tu contraseña aquí" type="password" name="password" value={login.password} onChange={setLogin} required />
          </div>
          {
            loading ? 
            <div className="auth-input-div" style={{
              border: "none",
            }}>
              <Loading />
            </div>
             : <button className="btn auth-btn">Iniciar sesión</button>
          }

          
        </div>
        <div className="auth-help-container">
          <p className="auth-help">¿No tienes cuenta?</p>
          <Link to="/register" className="auth-help-link">Registrate</Link>
        </div>
        <Link to="/" className="auth-help-link mt-2 text-light">Inicio</Link>
      </form>
    </div>
  )
}
