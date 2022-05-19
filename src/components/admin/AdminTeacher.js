import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startGetTeacher } from "../../redux/actions/admin";
import defaultImg from "../../image/user-image.svg";

export const AdminTeacher = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(startGetTeacher(id));
  }, [dispatch, id]);

  const back = (e) => {
    e.preventDefault();
    window.history.back();
  }


  if (!active) return <h2>Cargando</h2>;


  return (
    <div className="admin-view">
      <div className="teacher-profile">
        <div className="teacher-div-img">
          {
            active.teacher.image ?
              <img src={active.teacher.image} alt={active.teacher.name} className="teacher-img" />
              : <img src={defaultImg} alt={active.teacher.name} className="teacher-img" />
          }
        </div>
        <h2 className="profile-teacher-name">{active.teacher.name + " " + active.teacher.lastName}</h2>
        <p className="profile-teacher-info">{active.teacher.email}</p>
        <p className="profile-teacher-info">{active.teacher.phone}</p>
        <p className={ active.teacher.status === -2 ? "profile-teacher-status s-1" : "profile-teacher-status s" + active.teacher.status}>
          {active.teacher.status === 0
            ? "Status: Pendiente"
            : active.teacher.status === 1
              ? "Status: Activo"
              :  active.teacher.status === -1 ? "Status: Rechazado" : "Status: Eliminado"}
        </p>
      </div>
      <div className="teacher-docs">
        <h2 className="teacher-docs-title">Documentos</h2>
        {
          active.documents && active.documents.length > 0 ?
            active.documents.map(doc => (
              <div className="file-container flex align-items-center space-between teacher-doc" key={doc.id}>
                <p className="teacher-doc-name">{doc.name}</p>
                <a href={doc.url} target="_blank" className="teacher-doc-link" rel="noopener noreferrer">Link</a>
              </div>
            ))
            : <p>No hay documentos</p>
        }
      </div>
      <button className="btn btn-back" onClick={back}><i className="fa-solid fa-rotate-left"></i> Regresar</button>
    </div>
  )
}