import { useForm } from "../../hooks/useForm";

export const ChangePasswordForm = () => {

    const [passwordForm, setPasswordForm] = useForm({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const { password, newPassword, confirmNewPassword } = passwordForm;

    return (
        <form className="password-container">
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
