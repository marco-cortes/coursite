import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { uid } = useSelector(state => state.auth);
    //const lastPath = localStorage.getItem("lastPath") || "/login";
    //console.log(uid);
    return !uid ?
        children
        : <Navigate to={"/"} />
}
