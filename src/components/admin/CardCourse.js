import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { startSetCourseStatus } from "../../redux/actions/courses";

export const CardCourse = ({ course }) => {

    const dispatch = useDispatch();

    const setCourseStatus = (status) => {
        course.status = status;
        dispatch(startSetCourseStatus(course))
    }

    return (
        <div className="card card-admin">
            <div className={"card-img a" + course.id}>
                <img className="image" src={course.image} alt={course.title} />
            </div>
            <div className="card-body">
                <h2 className="category">{course.category.name}</h2>
                <h3 className="course">{course.title}</h3>
                <p className="teacher">Profesor: {course.teacher.name + " " + course.teacher.lastName}</p>
                <p className="info">
                    <span className="price">Precio: ${course.price}</span>
                    <span className="score">Score: {course.score}</span>
                </p>
            </div>
            <div className="card-btns">
                <Link className="btn btn-info" to={"/admin/courses/" + course.id}>
                    <i className="fa-solid fa-circle-info"></i> Detalles
                </Link>
                {
                    course.status === 0 ?
                        <>
                            <button className="btn btn-success" onClick={()=>setCourseStatus(1)}>
                                <i className="fa-solid fa-check"></i> Aprobar
                            </button>
                            <button className="btn btn-danger" onClick={()=>setCourseStatus(-1)}>
                                <i className="fa-solid fa-times"></i> Rechazar
                            </button>
                        </>
                        : 
                        <p className={"profile-teacher-status s" + course.status}>
                            {course.status === 1 ? "Aprobado" : "Rechazado"}
                        </p>
                }
            </div>
        </div>
    )
}
