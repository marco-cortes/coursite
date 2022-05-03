import { Link } from "react-router-dom";
import defaultImg from "../../image/user-image.svg";

export const CardTeacher = ({ teacher }) => {

    return (
        <div className="card-teacher">
            <div className="card-teacher-info">
                <h2 className="teacher-name">Nombre: {teacher.name + " " + teacher.lastName}</h2>
                <p className="teacher-info">Correo: {teacher.email}</p>
                <p className="teacher-info">Celular: {teacher.phone}</p>
                <Link to={"/admin/teachers/" + teacher.id} className="teacher-link"> {">"} Detalles</Link>
            </div>
            <div className="card-teacher-buttons">
                <div className="teacher-div-img">
                    {
                        teacher.image ?
                            <img src={teacher.img} alt={teacher.name} className="teacher-img" />
                            : <img src={defaultImg} alt={teacher.name} className="teacher-img" />
                    }
                </div>
                <div className="teacher-btns">
                    <button className="btn btn-success"><i className="fa-solid fa-check"></i >Aprobar</button>
                    <button className="btn btn-danger"><i className="fa-solid fa-times"></i> Rechazar</button>
                </div>
            </div>
        </div>
    )
}
