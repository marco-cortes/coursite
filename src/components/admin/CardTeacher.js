import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultImg from "../../image/user-image.svg";
import { startSetTeacherStatus } from "../../redux/actions/admin";

export const CardTeacher = ({ teacher }) => {

    const dispatch = useDispatch();

    const setTeacherStatus = (teacher, status) => {
        teacher.status = status;
        dispatch(startSetTeacherStatus(teacher));
    }

    const errorImage = (e) => {
        e.target.src = defaultImg;
    }

    return (
        <div className="card-teacher">
            <div className="card-teacher-info">
                <h2 className="teacher-info"><span className="text-dark">NOMBRE</span> <br/> {teacher.name + " " + teacher.lastName}</h2>
                <p className="teacher-info"><span className="text-dark">CORREO</span> <br/> {teacher.email}</p>
                <p className="teacher-info"><span className="text-dark">CELULAR</span> <br/> {teacher.phone}</p>
                <Link to={"/admin/teachers/" + teacher.id} className="teacher-link"> {">"} Detalles</Link>
            </div>
            {
                teacher.status === 0 ?
                    <h2 className="teacher-status warning">Pendiente</h2>
                    : teacher.status === 1 ?
                        <h2 className="teacher-status success">Aprobado</h2>
                        : teacher.status === -1 ?
                        <h2 className="teacher-status danger">Rechazado</h2>
                        : <h2 className="teacher-status danger">Eliminado</h2>
            }
            <div className="card-teacher-buttons">
                <div className="teacher-div-img">
                    {
                        teacher.image ?
                            <img src={teacher.image} alt={teacher.name} className="teacher-img" onError={errorImage} />
                            : <img src={defaultImg} alt={teacher.name} className="teacher-img" />
                    }
                </div>
                {
                    teacher.status === 0 &&
                    <div className="teacher-btns">
                        <button className="btn btn-success" onClick={() => setTeacherStatus(teacher, 1)} ><i className="fa-solid fa-check"></i >Aprobar</button>
                        <button className="btn btn-danger" onClick={() => setTeacherStatus(teacher, -1)}><i className="fa-solid fa-times"></i> Rechazar</button>
                    </div>
                }
            </div>
        </div>
    )
}
