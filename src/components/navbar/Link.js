import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { hiddenNotifications, showNotifications } from "../../redux/actions/ui";
import { Notification } from "../ui/Notification";

export const Link = ({ text, link, icon, button }) => {

    const { notifications } = useSelector(state => state.auth);
    const { notificationsOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const linkActive = (isActive) => {
        return "link " + (isActive ? "active" : "");
    }

    const show = () => {
        if(notificationsOpen) {
            dispatch(hiddenNotifications())
            document.getElementById("notifications").classList.remove("active");
        } else {
            dispatch(showNotifications());
            document.getElementById("notifications").classList.add("active");
        }
    }

    if (button) {
        return (
            <div className="notifications-container">
                <button type="button" className="link btn-notification" id="notifications" onClick={show} >
                    <div className="nav-link">
                        <div className="link-bar"></div>
                        <span className="link-text">
                            <i className={icon + " i"}></i>{text} {notifications  && <span className="link-notifications">{notifications.length}</span>}
                        </span>
                    </div>
                </button>
                {
                    notificationsOpen &&
                    <div className="notifications animate__animated animate__fadeIn">
                        {

                            notifications && notifications.length > 0 ? notifications.map((notification, index) => (
                                <Notification notification={notification} i={index} key={index} />
                            )) : <div className="notification-empty">No hay notificaciones</div>
                        }
                    </div>
                }
            </div>
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
