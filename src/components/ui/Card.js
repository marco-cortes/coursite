import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
export const Card = ({ id, title, category, teacher, price, score, image, isBought, dir }) => {

    const { user } = useSelector(state => state.auth);

    return (
        <div className="card">
            <div className={"card-img a" + id}>
                <img className="image" src={image} alt={title} />
            </div>
            <div className="card-body">
                <h2 className="category">{category}</h2>
                <h3 className="course">{title}</h3>
                <p className="teacher">Profesor: {teacher}</p>
                <p className="info">
                    <span className="price">Precio: ${price}</span>
                    <span className="score">Score: {score}</span>
                </p>
            </div>
            <div className="card-btns">
                <Link className="btn btn-info" to={dir + "/courses/" + id}>
                <i className="fa-solid fa-circle-info"></i> Detalles
                </Link>
                {
                    isBought ?
                    <Link className="btn btn-primary" to={dir + "/learning/" + id}>
                        Ir al Curso <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                    : user && user.role === 1 ?
                    <Link className="btn btn-primary" to={dir + "/courses/buy/" + id}>
                        Inscribirse <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </Link>
                    : user && user.role === 2 ?
                    <Link className="btn btn-primary" to={dir + "/courses/" + id + "/edit"}>
                        Editar <i className="fa-solid fa-pen"></i>
                    </Link> : null
                }
            </div>
        </div>
    )
}
