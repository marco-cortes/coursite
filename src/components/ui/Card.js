import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
export const Card = ({ course, dir }) => {

    const { user } = useSelector(state => state.auth);

    if(!course)
        return <div>Loading...</div>;

    return (
        <div className="card">
            <div className={"card-img a" + course.id}>
                <img className="image" src={course.image} alt={course.title} />
            </div>
            <div className="card-body">
                <h2 className="category">{course.category.name ? course.category.name : course.category}</h2>
                <h3 className="course">{course.title}</h3>
                <p className="teacher">Profesor: {course.teacher.name ? course.teacher.name + " " + course.teacher.lastName : course.teacher}</p>
                {
                    user && user.role === 2 ? <span className="status">Status: {course.status}</span>
                    : user.role === 1 && course.isBought && <span className="status">Progreso: {Math.round(course.progress)}%</span>
                }
                <p className="info">
                    <span className="price">Precio: ${course.price}</span>
                    <span className="score">Score: {course.score/20} <i className="fa-solid fa-star"></i></span>
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
                    <Link className="btn btn-primary" to={dir + "/courses/" + course.id + "/edit"}>
                        Editar <i className="fa-solid fa-pen"></i>
                    </Link> : null
                }
            </div>
        </div>
    )
}
