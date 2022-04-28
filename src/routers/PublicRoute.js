import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { user } = useSelector(state => state.auth);
    //const lastPath = localStorage.getItem("lastPath") || "/login";
    //console.log(uid);
    return !user ?
        children
        : <Navigate to={"/courses"} />
}
