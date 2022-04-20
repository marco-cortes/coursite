/*import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";*/
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { CoursesView } from "../components/views/CoursesView";
import { NavBar } from "../components/NavBar";
//import { startChecking } from "../actions/auth";

import { PublicRoute } from "./PublicRoute";
import { CourseView } from "../components/views/CourseView";
import { PayView } from "../components/views/PayView";
import { StudentCoursesView } from "../components/views/StudentCoursesView";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/actions/auth";
//import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    /*const dispatch = useDispatch();
    const { checking } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch, checking]);

    if (checking) {
        return <h5>Espere...</h5>
    }*/
    return (
        <div className="app-container">
            <BrowserRouter>
                <NavBar />
                <div className="container">
                    <div className="app">
                        <Routes>
                            <Route path="/student/login" element={
                                <PublicRoute>
                                    <CoursesView />
                                </PublicRoute>
                            } />

                            <Route path="/student/courses" element={
                                <PublicRoute>
                                    <CoursesView />
                                </PublicRoute>
                            } />
                            <Route path="/student/courses/:id" element={
                                <PublicRoute>
                                    <CourseView />
                                </PublicRoute>
                            }
                            />
                            <Route path="/student/courses/buy/:id" element={
                                <PublicRoute>
                                    <PayView />
                                </PublicRoute>
                            }
                            />
                            <Route path="/student/learning" element={
                                <PublicRoute>
                                    <StudentCoursesView />
                                </PublicRoute>
                            }
                            />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}
