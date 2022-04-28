import { Link } from "react-router-dom"
export const Logo = ({ dark }) => {
  return (
    <Link className={dark ? "logo dark" : "logo"} to="/courses">
      <span className="t1">Cour</span>
      <span className="t2">site</span>
    </Link>
  )
}
