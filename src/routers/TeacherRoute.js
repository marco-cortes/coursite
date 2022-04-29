import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const TeacherRoute = ({ children }) => {

    const user = useSelector(state => state.auth.user);
    //const location = useLocation();

    //localStorage.setItem("lastPath", location.pathname+location.search);

    return user && user.role === 2 ?
        children
        : <Navigate to="/login" />
}
