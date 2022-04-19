
export const Card = ({id, course, category, teacher, price, score, image}) => {
  return (
    <div className="card">
        <div className={"card-img a" + id}>
            <img className="image" src={image} alt={course} />
        </div>
        <div className="card-body">
            <h2 className="category">{category}</h2>
            <h3 className="course">{course}</h3>
            <p className="teacher">Profesor: {teacher}</p>
            <p className="info">
                <span className="price">Precio: {price}</span>
                <span className="score">Score: {score}</span>
            </p>
        </div>
        <div className="card-btns">
            <button className="btn btn-info">
                Detalles
            </button>
            <button className="btn btn-primary">
                Inscribirse
            </button>
        </div>
    </div>
  )
}
