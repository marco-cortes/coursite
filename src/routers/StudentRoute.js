import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const StudentRoute = ({ children }) => {

    const user = useSelector(state => state.auth.user);
    //const location = useLocation();

    //localStorage.setItem("lastPath", location.pathname+location.search);

    return user && user.role === 1 ?
        children
        : <Navigate to="/login" />
}
