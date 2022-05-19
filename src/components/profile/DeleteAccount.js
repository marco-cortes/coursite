import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/actions/auth";
import { closeModal } from "../../redux/actions/ui";

export const DeleteAccount = ({ user }) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(closeModal());
        user.status = -2;
        dispatch(saveUser(user, true));
    }

    return (
        <div className="delete-container">
            <h2 className="delete-user">
                ¿Estas seguro que deseas eliminar tu cuenta?
            </h2>
            <p className="delete-user-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <button className="btn btn-danger-outline" onClick={handleClick}>ELIMINAR CUENTA</button>
        </div>
    )
}
