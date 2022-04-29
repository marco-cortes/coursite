import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { user } = useSelector(state => state.auth);
    //const lastPath = localStorage.getItem("lastPath") || "/login";
    //console.log(uid);
    return !user ?
        children
        : user.role === 1 ? <Navigate to={"/student/courses"} /> 
        : user.role === 2 ? <Navigate to={"/teacher/courses"} />
        : user.role === 3 && <Navigate to={"/admin/"} />
}
