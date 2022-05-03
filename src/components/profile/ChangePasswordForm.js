import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { startChangePassword } from "../../redux/actions/auth";

export const ChangePasswordForm = () => {

    const [passwordForm, setPasswordForm, reset] = useForm({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const { password, newPassword, confirmNewPassword } = passwordForm;
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if(newPassword === confirmNewPassword) {
            dispatch(startChangePassword(user, password, newPassword));
            reset();
        } else {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error",
            })
        }
    }
    return (
        <form className="password-container" onSubmit={handleChangePassword}>
            <h3 className="label-password">Contraseña actual</h3>
            <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Ingrese su contraseña actual" name="password" onChange={setPasswordForm} value={password} />
            </div>
            <h3 className="label-password">Nueva contraseña</h3>
            <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Ingrese su nueva contraseña" name="newPassword" onChange={setPasswordForm} value={newPassword} />
            </div>
            <h3 className="label-password">Repetir nueva contraseña</h3>
            <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Repita su nueva contraseña" name="confirmNewPassword" onChange={setPasswordForm} value={confirmNewPassword} />
            </div>
            <button className="btn btn-primary-outline">GUARDAR</button>
        </form>
    )
}
