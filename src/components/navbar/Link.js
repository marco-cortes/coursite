import { NavLink } from "react-router-dom"

export const Link = ({ text, link }) => {

    const linkActive = (isActive) => {
        return "link " + (isActive ? "active" : "");
    }

    return (
        <NavLink to={link} className={({ isActive }) => linkActive(isActive)}>
            <div className="nav-link">
                <div className="link-bar"></div>
                <span className="link-text">{text}</span>
            </div>
        </NavLink>
    )
}
