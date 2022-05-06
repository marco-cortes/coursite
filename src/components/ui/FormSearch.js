import { Link } from "react-router-dom"

export const FormSearch = ({ role }) => {

  return (
    <div className="form-div">
      {
        role === 2 &&
        <Link className="btn btn-primary" to={"/teacher/courses/new"}>
          Nuevo Curso <i className="fa-solid fa-plus"></i>
        </Link>
      }
      <form className="search">
        <input className="input-search" placeholder="Ingrese una búsqueda" />
        <button className="btn btn-search"><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
      </form>
    </div>
  )
}
