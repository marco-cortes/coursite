import { useState } from "react";
import { Link } from "react-router-dom";

export const NavBarApp = ({ children }) => {

  const [active, setActive] = useState(false);

  const openLinks = () => {
    document.getElementById("app-links").classList.toggle("app-links-active");
    setActive(!active);
  }
  return (
    <>
      <br />
      <div className="course-links">
        <div className="btn-mobile">
          <Link to={"/courses"} className="header-logo">
            <span className="t3">Cour</span>
            <span className="t1">site</span>
          </Link>
          <button className="nav-button" onClick={openLinks}><i className={active ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i></button>
        </div>
        <div className="app-links" id="app-links">
          {children}
        </div>
      </div>
    </>
  )
}
