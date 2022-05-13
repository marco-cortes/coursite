import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { saveUser } from "../../redux/actions/auth";
import { ChangePasswordForm } from "../profile/ChangePasswordForm";
import { DeleteAccount } from "../profile/DeleteAccount";
import { ProfileButtons } from "../profile/ProfileButtons";
import { UserImage } from "../profile/UserImage";
import { Modal } from "../ui/Modal";
import { UploadPhoto } from "../ui/UploadPhoto";

export const ProfileView = ({ role }) => {

  const { user } = useSelector(state => state.auth);

  const [select, setSelect] = useState(0);

  const [userForm, setUserForm] = useForm(user);

  const { name, email, lastName, phone, image } = userForm;

  const dispatch = useDispatch();

  const submitUpdate = (e) => {
    e.preventDefault();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    if(image)
      user.image = image;
    if (phone)
      user.phone = phone;
    dispatch(saveUser(user));
    disable();
  }

  const enable = (e, i) => {
    e.preventDefault();
    switch (i) {
      case 0:
        let a = document.getElementById("input-user-name");
        a.disabled = !a.disabled;
        a.parentNode.classList.toggle("enabled");
        break;
      case 1:
        let b = document.getElementById("input-user-lastname");
        b.disabled = !b.disabled;
        b.parentNode.classList.toggle("enabled");
        break;
      case 2:
        let c = document.getElementById("input-user-email");
        c.disabled = !c.disabled;
        c.parentNode.classList.toggle("enabled");
        break;
      case 3:
        let d = document.getElementById("input-user-phone");
        d.disabled = !d.disabled;
        d.parentNode.classList.toggle("enabled");
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
    <div className="course-view animate__animated animate__fadeIn">
      <form className="profile-container" onSubmit={submitUpdate}>
        <div>
          <UserImage image={user.image} name={user.name} lastname={user.lastName} setSelect={setSelect} />
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
            {
              role === 2 &&
              <>
                <h3 className="user-form-title">Teléfono:</h3>
                <div className="user-form-group">
                  <div className="input-button">
                    <input className="user-form-input" onChange={setUserForm} name="phone" value={phone} disabled id="input-user-phone" />
                    <button onClick={e => enable(e, 3)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
                  </div>
                </div>
              </>
            }
          </div>
          <ProfileButtons setSelect={setSelect} />
        </div>
      </form>
      <Modal title={select === 1 ? "ELIMINAR CUENTA" : select === 0 ? "CAMBIAR CONTRASEÑA" : "ACTUALIZAR FOTO"}>
        {
          select ===  1 ?
            <DeleteAccount />
            : select === 0 ?
              <ChangePasswordForm />
              : <UploadPhoto />
        }
      </Modal>
    </div>
  )
}
