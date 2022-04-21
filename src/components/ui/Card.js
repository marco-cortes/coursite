import { Link } from "react-router-dom"

export const Card = ({ id, title, category, teacher, price, score, image, isBought }) => {



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
                <Link className="btn btn-info" to={"/student/courses/" + id}>
                    Detalles
                </Link>
                {
                    isBought ?
                    <Link className="btn btn-primary" to={"/student/learning/" + id}>
                        Ir al Curso
                    </Link>
                    :
                    <Link className="btn btn-primary" to={"/student/courses/buy/" + id}>
                        Inscribirse
                    </Link>
                }
            </div>
        </div>
    )
}
