import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm";

export const FormSearch = ({ role, setCourses }) => {

  const { courses } = useSelector(state => state.courses);

  const [formSearch, setFormSearch] = useForm({
    search: ""
  })

  const filter = (e) => {
    e.preventDefault();
    setCourses(courses.filter(course => course.title.toLowerCase().includes(formSearch.search.toLowerCase())));
  }

  const handleChange = (e) => {
    setFormSearch(e);
    filter(e);
  }

  return (
    <div className="form-div">
      
      {
        role === 2 ?
        <Link className="btn btn-primary" to={"/teacher/courses/new"}>
          Nuevo Curso <i className="fa-solid fa-plus"></i>
        </Link> : <div></div>
      }
      <form className="search" onSubmit={filter}>
        <input className="input-search" placeholder="Ingrese una búsqueda" onChange={handleChange} name="search" value={formSearch.search} />
        <button className="btn btn-search" type="submit"><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
      </form>
    </div>
  )
}
