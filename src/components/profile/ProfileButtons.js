import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/ui";

export const ProfileButtons = ({setSelect}) => {

  const dispatch = useDispatch();

  const showDelete = () => {
    setSelect(1);
    dispatch(showModal());
  }

  const showPassword = () => {
    setSelect(0);
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
        </div>
    )
}
