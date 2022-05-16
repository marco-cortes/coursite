import { Link } from "react-router-dom"
import img404 from "../../image/404.svg"

export const View404 = () => {
  return (
    <div className="view-404">
      <img src={img404} className="img-fluid" alt="404" />
      <h2 className="title-h1 text-blue-dark mt-2">Página no encontrada :(</h2>
      <Link className="link-404" to={"/"}>Regresar</Link>
    </div>
  )
}
