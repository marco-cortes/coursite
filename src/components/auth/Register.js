import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../redux/actions/auth';
import { Logo } from '../Logo';
import img from "../../image/register.svg";
import Swal from 'sweetalert2';

export const Register = ({ role }) => {
    const [register, setRegister] = useForm({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: role
    });

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        if (register.password === register.confirmPassword) {
            dispatch(startRegister({
                name: register.name,
                lastName: register.lastName,
                email: register.email,
                password: register.password,
                role: register.role
            }));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden',
            });
        }
    }

    return (
        <div className="auth-container animate__animated animate__fadeIn">
            <form className="auth-form-container" onSubmit={handleRegister}>
                <div className="auth-form-content">
                    <h2 className="auth-title">Registro {role === 2 ? "Profesor" : role === 3 ? "Administrador" : null}</h2>
                    <label className="auth-label">Nombre(s):</label>
                    <div className="auth-input-div">
                        <i className="fa-solid fa-user auth-icon"></i>
                        <input className="auth-input" placeholder="Ejemplo: Juan" type="text" name="name" value={register.name} onChange={setRegister} required />
                    </div>
                    <label className="auth-label">Apellido(s):</label>
                    <div className="auth-input-div">
                        <i className="fa-solid fa-user auth-icon"></i>
                        <input className="auth-input" placeholder="Ejemplo: Pérez" type="text" name="lastName" value={register.lastName} onChange={setRegister} required />
                    </div>
                    <label className="auth-label">Correo:</label>
                    <div className="auth-input-div">
                        <i className="fa-solid fa-at auth-icon"></i>
                        <input className="auth-input" placeholder="Ejemplo: abc@email.com" type="email" name="email" value={register.email} onChange={setRegister} required />
                    </div>
                    <label className="auth-label">Tu constraseña:</label>
                    <div className="auth-input-div">
                        <i className="fa-solid fa-lock auth-icon"></i>
                        <input className="auth-input" placeholder="Tu contraseña aquí" type="password" name="password" value={register.password} onChange={setRegister} required />
                    </div>
                    <label className="auth-label">Confirmar contraseña:</label>
                    <div className="auth-input-div">
                        <i className="fa-solid fa-lock auth-icon"></i>
                        <input className="auth-input" placeholder="Repetir contraseña" type="password" name="confirmPassword" value={register.confirmPassword} onChange={setRegister} required />
                    </div>
                    <button className="btn auth-btn">Registrarse</button>
                </div>
                <div className="auth-help-container">
                    <p className="auth-help">¿Ya tienes cuenta?</p>
                    <Link to="/login" className="auth-help-link">Iniciar sesión</Link>
                </div>
            </form>
            <div className="auth-image-container">
                <div className="auth-logo right">
                    <Logo />
                </div>
                <img src={img} alt="" className="auth-image" />
            </div>
        </div>
    )
}
