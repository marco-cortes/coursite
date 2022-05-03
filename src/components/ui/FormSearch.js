import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/ui";

export const FormSearch = ({ role }) => {

  const dispatch = useDispatch();

  const handleCourse = (e) => {
    e.preventDefault();
    dispatch(showModal());
  }

  return (
    <div className="form-div">
      {
        role === 2 &&
        <button className="btn btn-primary" onClick={handleCourse}>
          Nuevo Curso <i className="fa-solid fa-plus"></i>
        </button>
      }
      <form className="search">
        <input className="input-search" placeholder="Ingrese una búsqueda" />
        <button className="btn btn-search"><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
      </form>
    </div>
  )
}
