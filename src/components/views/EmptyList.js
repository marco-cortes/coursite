import empty from "../../image/empty.svg";

export const EmptyList = () => {
  return (
    <div className="empty-list">
        <img src={empty} className="img-fluid" alt="404" />
        <h2 className="title-h1 text-blue-dark mt-1">No hay datos :(</h2>
    </div>
  )
}
