import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showModal } from "../../redux/actions/ui";

export const ProfileButtons = ({setSelect}) => {

  const dispatch = useDispatch();

  const showDelete = () => {
    setSelect(true);
    dispatch(showModal());
  }

  const showPassword = () => {
    setSelect(false);
    dispatch(showModal());
  }

    return (
        <div className="profile-btns">
            <button className="btn btn-secondary" type="button" onClick={showDelete}>
                <i className="fa-solid fa-trash icon danger"></i>
                Eliminar cuenta
            </button>
            <button className="btn btn-secondary" type="button" onClick={showPassword}>
                <i className="fa-solid fa-pen icon warning"></i>
                Actualizar contraseña
            </button>
            <button className="btn btn-secondary" type="submit">
                <i className="fa-solid fa-check icon success"></i>
                Actualizar datos
            </button>
            <Link className="btn btn-danger" to="/teacher/register/finish">
                Documentos
            </Link>
        </div>
    )
}
