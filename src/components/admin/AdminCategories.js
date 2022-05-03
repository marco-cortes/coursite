import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startAddCategory, startUpdateCategory } from "../../redux/actions/courses";

export const AdminCategories = () => {

  const { categories } = useSelector(state => state.courses);

  const dispatch = useDispatch();

  const [category, setCategory, reset, setValues] = useForm({
    name: "",
    id: null
  })

  const handleCreate = (e) => {
    e.preventDefault();
    if(category.id === null)
      dispatch(startAddCategory(category));
    else 
      dispatch(startUpdateCategory(category));
    reset();
  }

  const setCategoryActive = (e, c) => {
    e.preventDefault();
    setValues(c);
  }

  return (
    <div className="admin-categories">
      <div className="head-categories">
        <h2 className="admin-title">Administración de categorías</h2>
        <form className="category-form" onSubmit={handleCreate}>
          <input className="category-input" type="text" name="name" value={category.name} onChange={setCategory} placeholder="Nombre de la categoría" />
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </form>
      </div>
      {
        categories &&
        <div className="category-list">
          {
            categories.map(category => (
              <div className="category-list-item" key={category.id}>
                <div className="category-info">
                  <h2 className="category-text">{category.id}</h2>
                  <h2 className="category-text">{category.name}</h2>
                </div>
                <div className="category-btns">
                  <button className="btn btn-danger"> Eliminar</button>
                  <button className="btn btn-warning" onClick={e=>setCategoryActive(e,category)}> Editar</button>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}
