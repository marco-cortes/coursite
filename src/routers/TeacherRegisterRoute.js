import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const TeacherRegisterRoute = ({ children }) => {
    const { user } = useSelector(state => state.auth);

    return user && user.role === 2 ?
        children
        : <Navigate to="/login" />
}
