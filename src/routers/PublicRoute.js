import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { user } = useSelector(state => state.auth);

    const lastPath = localStorage.getItem("lastPath");

    return !user ?
        children 
        : user.role === 1 ? lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/student/courses"} /> 
        : user.role === 2 ? lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/teacher/courses"} />
        : user.role === 3 && lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/admin/"} />
}
