import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {

    const { id } = useSelector(state => state.auth.user);
    //const location = useLocation();

    //localStorage.setItem("lastPath", location.pathname+location.search);

    return id ?
        children
        : <Navigate to="/login" />
}
