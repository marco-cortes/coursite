import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {

    const { user, docs } = useSelector(state => state.auth);

    const lastPath = localStorage.getItem("lastPath");

    return !user ?
        children 
        : user.role === 1 ? lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/student/courses"} /> 
        : user.role === 2 && docs && docs.length <= 0 ? <Navigate to="/teacher/register/finish" /> 
        : user.role === 2 && docs && docs.length > 0 ? lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/teacher/courses"} />
        : user.role === 3 && lastPath ? <Navigate to={lastPath} /> : <Navigate to={"/admin/"} />
}
