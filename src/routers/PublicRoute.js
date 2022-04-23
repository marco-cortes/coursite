import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { id } = useSelector(state => state.auth.user);
    //const lastPath = localStorage.getItem("lastPath") || "/login";
    //console.log(uid);
    return !id ?
        children
        : <Navigate to={"/courses"} />
}
