import { NavLink } from "react-router-dom"

export const Link = ({ text, link, icon, button }) => {

    const linkActive = (isActive) => {
        return "link " + (isActive ? "active" : "");
    }

    if (button) {
        return (
            <button type="button" className="link btn-notification">
                <div className="nav-link">
                    <div className="link-bar"></div>
                    <span className="link-text"><i className={icon + " i"}></i> {text}</span>
                </div>
            </button>
        )
    }

    return (
        <NavLink to={link} className={({ isActive }) => linkActive(isActive)}>
            <div className="nav-link">
                <div className="link-bar"></div>
                <span className="link-text"><i className={icon + " i"}></i> {text}</span>
            </div>
        </NavLink>
    )
}
