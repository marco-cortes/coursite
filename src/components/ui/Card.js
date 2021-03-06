import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import { startDeleteCourse } from "../../redux/actions/teachers";
import { Loading } from "./Loading";
import image from "../../image/icon.png";

export const Card = ({ course, dir }) => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if (!course)
        return <Loading />;

    const deleteCourse = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                dispatch(startDeleteCourse(course.id));
            }
        });
    }

    const errorImage = (e) => {
        e.target.src = image;
    }

    return (
        <div className={user && user.role === 2 ? "card card-t" : "card"} >
            <div className={"card-img a" + course.id}>
                <img className="image" src={course.image} alt={course.title} onError={errorImage} />
            </div>
            <div className="card-body">
                <h2 className="category">{course.category.name ? course.category.name : course.category}</h2>
                <h3 className="course">{course.title}</h3>
                <p className="teacher">Profesor: {course.teacher.name ? course.teacher.name + " " + course.teacher.lastName : course.teacher}</p>
                {
                    user ? user.role === 2 ? <span className="status">Status: {course.status}</span> :
                        course.isBought ? <span className="status">Progreso: {Math.round(course.progress)}%</span> : "" : ""
                }
                <p className="info">
                    <span className="price">Precio: ${course.price}</span>
                    <span className="score">Score: {course.score / 20} <i className="fa-solid fa-star"></i></span>
                </p>
            </div>
            <div className="card-btns">
                <Link className="btn btn-info" to={dir + "/courses/" + course.id}>
                    <i className="fa-solid fa-circle-info"></i> Detalles
                </Link>
                {
                    course.isBought ?
                        <Link className="btn btn-primary" to={dir + "/learning/" + course.id}>
                            Ir al Curso <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>
                        : user && user.role === 1 ?
                            <Link className="btn btn-primary" to={dir + "/courses/buy/" + course.id}>
                                Inscribirse <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                            : user && user.role === 2 ?
                                <>
                                    <Link className="btn btn-primary" to={dir + "/courses/" + course.id + "/edit"}>
                                        Editar <i className="fa-solid fa-pen"></i>
                                    </Link>
                                    <button className="btn btn-danger" onClick={deleteCourse}>
                                        Eliminar <i className="fa-solid fa-trash"></i>
                                    </button>
                                </> : null
                }
            </div>
        </div>
    )
}
