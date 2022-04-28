import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { saveUser } from "../../redux/actions/auth";
import { ChangePasswordForm } from "../profile/ChangePasswordForm";
import { DeleteAccount } from "../profile/DeleteAccount";
import { ProfileButtons } from "../profile/ProfileButtons";
import { UserImage } from "../profile/UserImage";
import { Modal } from "../ui/Modal";

export const ProfileView = () => {

  const { user } = useSelector(state => state.auth);

  const [select, setSelect] = useState(false);

  const [userForm, setUserForm] = useForm(user);

  const { name, email, lastName } = userForm;

  const dispatch = useDispatch();

  const submitUpdate = (e) => {
    e.preventDefault();
    dispatch(saveUser(userForm));
    disable();
  }

  const enable = (e, i) => {
    e.preventDefault();
    switch (i) {
      case 0:
        let a = document.getElementById("input-user-name");
        a.disabled = false;
        a.parentNode.classList.add("enabled");
        break;
      case 1:
        let b = document.getElementById("input-user-lastname");
        b.disabled = false;
        b.parentNode.classList.add("enabled");
        break;
      case 2:
        let c = document.getElementById("input-user-email");
        c.disabled = false;
        c.parentNode.classList.add("enabled");
        break;
      default:
        break;
    }
  }

  const disable = () => {
    const inputs = document.getElementsByClassName("user-form-input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
      inputs[i].parentNode.classList.remove("enabled");
    }
  }


  return (
    <div className="course-view">
      <form className="profile-container" onSubmit={submitUpdate}>
        <UserImage name={user.name} lastname={user.lastName} />
        <div className="user-form">
          <h3 className="user-form-title">Nombre(s):</h3>
          <div className="user-form-group">
            <div className="input-button">
              <input className="user-form-input" onChange={setUserForm} name="name" value={name} disabled id="input-user-name" />
              <button onClick={e => enable(e, 0)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
            </div>
          </div>
          <h3 className="user-form-title">Apellido(s):</h3>
          <div className="user-form-group">
            <div className="input-button">
              <input className="user-form-input" onChange={setUserForm} name="lastName" value={lastName} disabled id="input-user-lastname" />
              <button onClick={e => enable(e, 1)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
            </div>
          </div>
          <h3 className="user-form-title">Correo electrónico:</h3>
          <div className="user-form-group">
            <div className="input-button">
              <input className="user-form-input" onChange={setUserForm} name="email" value={email} disabled id="input-user-email" />
              <button onClick={e => enable(e, 2)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
            </div>
          </div>
        </div>
        <ProfileButtons setSelect={setSelect} />
      </form>
      <Modal title={select ? "ELIMINAR CUENTA" : "CAMBIAR CONTRASEÑA"}>
        {
          select ?
            <DeleteAccount />
            :
            <ChangePasswordForm />
        }
      </Modal>
    </div>
  )
}
