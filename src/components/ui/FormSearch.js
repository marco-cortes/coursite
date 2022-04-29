
export const FormSearch = ({ role }) => {
  return (
    <div className="form-div">
      {
        role === 2 &&
        <button className="btn btn-primary">
          Nuevo Curso
        </button>
      }
      <form className="search">
        <input className="input-search" placeholder="Ingrese una búsqueda" />
        <button className="btn btn-search"><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
      </form>
    </div>
  )
}
