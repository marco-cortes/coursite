import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const TeacherRoute = ({ children }) => {

    const { user, docs } = useSelector(state => state.auth);
    const location = useLocation();

    if (user && user.role === 2 && docs && docs.length > 0)
        localStorage.setItem("lastPath", location.pathname + location.search);

    return user && user.role === 2 && docs && docs.length > 0 ?
        children
        :  <Navigate to="/teacher/register/finish" />
}
