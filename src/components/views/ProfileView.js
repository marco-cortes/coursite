import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions/ui";
import { UserForm } from "../profile/UserForm";
import { UserImage } from "../profile/UserImage";
import { Modal } from "../ui/Modal";

export const ProfileView = () => {

  const { user } = useSelector(state => state.auth);

  const [select, setSelect] = useState(false);

  const dispatch = useDispatch();

  const showDelete = () => {
    setSelect(true);
    dispatch(showModal());
  }

  const showPassword = () => {
    setSelect(false);
    dispatch(showModal());
  }

  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <div className="course-view">
      <form className="profile-container">
        <UserImage name={user.name} lastname={user.lastName} />
        <UserForm {...user} />
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
      </form>
      <Modal title={select ? "ELIMINAR CUENTA" : "CAMBIAR CONTRASEÑA"}>
        {
          select ?
            <div className="delete-container">
              <h2 className="delete-user">
                ¿Estas seguro que deseas eliminar tu cuenta?
              </h2>
              <p className="delete-user-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <button className="btn btn-danger-outline">ELIMINAR CUENTA</button>
            </div>
            :
            <div className="password-container">
              <h3 className="label-password">Contraseña actual</h3>
              <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Ingrese su contraseña actual" />
              </div>
              <h3 className="label-password">Nueva contraseña</h3>
              <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Ingrese su nueva contraseña" />
              </div>
              <h3 className="label-password">Repetir nueva contraseña</h3>
              <div className="password-div">
                <i className="fa-solid fa-lock icon-password"></i>
                <input className="password-input" type="password" placeholder="Repita su nueva contraseña" />
              </div>
              <button className="btn btn-primary-outline">GUARDAR</button>
            </div>
        }
      </Modal>
    </div>
  )
}
