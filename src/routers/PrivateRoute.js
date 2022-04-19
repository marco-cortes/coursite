import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {

    const { uid } = useSelector(state => state.auth);
    //const location = useLocation();

    //localStorage.setItem("lastPath", location.pathname+location.search);

    return uid ?
        children
        : <Navigate to="/login" />
}
