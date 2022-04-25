import { useForm } from "../../hooks/useForm";

export const UserForm = ({ name, email, lastName }) => {

    const [user, setUser] = useForm({
        name: name,
        email: email,
        lastName: lastName
    });

    const { name:fname, email:femail, lastName:flastname } = user;

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

    return (
        <div className="user-form">
            <h3 className="user-form-title">Nombre(s):</h3>
            <div className="user-form-group">
                <div className="input-button">
                    <input className="user-form-input" onChange={setUser} name="name" value={fname} disabled id="input-user-name" />
                    <button onClick={e => enable(e, 0)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
                </div>
            </div>
            <h3 className="user-form-title">Apellido(s):</h3>
            <div className="user-form-group">
                <div className="input-button">
                    <input className="user-form-input" onChange={setUser} name="lastName" value={flastname} disabled id="input-user-lastname" />
                    <button onClick={e => enable(e, 1)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
                </div>
            </div>
            <h3 className="user-form-title">Correo electrónico:</h3>
            <div className="user-form-group">
                <div className="input-button">
                    <input className="user-form-input" onChange={setUser} name="email" value={femail} disabled id="input-user-email" />
                    <button onClick={e => enable(e, 2)} className="user-form-button"><i className="fa-solid fa-pen"></i> Editar </button>
                </div>
            </div>
        </div>
    )
}
