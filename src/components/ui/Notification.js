export const Notification = ({ notification, i }) => {


    const handleClick = () => {
        console.log("click");
        console.log(notification, i);
        /**
         * change status of notification to read
         */
    }

    let icon = "";

    let read = notification.status === 1 ? "read" : "";

    if(notification.type === "success") {
        icon = "fa-solid fa-check-circle";
    } else if(notification.type === "error") {
        icon = "fa-solid fa-exclamation-circle";
    } else if(notification.type === "warning") {
        icon = "fa-solid fa-info-circle";
    } else {
        icon = "fa-solid fa-bell";
    }


    return (
        <div className={read +" notification notification-type-" + notification.type} onClick={handleClick}>
            <div className="notification-header">
                <h2 className="notification-title">{notification.title}</h2>
            </div>
            <div className="notification-body">
                <p className="notification-text">{notification.message}</p>
                <i className={"notification-icon notification-" + notification.type + " " + icon}></i>
            </div>
        </div>
    )
}
