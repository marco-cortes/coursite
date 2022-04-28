import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { CoursesView } from "../components/views/CoursesView";

import { CourseView } from "../components/views/CourseView";
import { PayView } from "../components/views/PayView";
import { StudentCoursesView } from "../components/views/StudentCoursesView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../redux/actions/auth";
import { StudentCourseView } from "../components/views/StudentCourseView";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ProfileView } from "../components/views/ProfileView";
import { Login } from "../components/auth/Login";
import { Container } from "../components/ui/Container";
import { Register } from "../components/auth/Register";

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    const { checking } = useSelector(state => state.auth);



    /*useEffect(() => {
        dispatch(startLoadCoursesStudent());
    }, [dispatch]);*/


    if (checking) {
        return <h5>Espere...</h5>
    }



    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />
                    <Route path="/courses" element={
                        <Container>
                            <CoursesView />
                        </Container>
                    } />
                    <Route path="/courses/:id" element={
                        <Container>
                            <CourseView />
                        </Container>
                    }
                    />
                    <Route path="/courses/buy/:id" element={
                        <PrivateRoute>
                            <Container>
                                <PayView />
                            </Container>
                        </PrivateRoute>
                    }
                    />
                    <Route path="/learning" element={
                        <PrivateRoute>
                            <Container>
                                <StudentCoursesView />
                            </Container>
                        </PrivateRoute>
                    }
                    />
                    <Route path="/learning/:id" element={
                        <PrivateRoute>
                            <Container>
                                <StudentCourseView />
                            </Container>
                        </PrivateRoute>
                    }
                    />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Container>
                                <ProfileView />
                            </Container>
                        </PrivateRoute>
                    }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}
