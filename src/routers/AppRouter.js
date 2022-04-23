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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/actions/auth";
import { startLoadCoursesStudent } from "../redux/actions/courses";
import { StudentCourseView } from "../components/views/StudentCourseView";
import { PrivateRoute } from "./PrivateRoute";
//import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const { checking } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startLoadCoursesStudent());
    },[checking, dispatch]);

    /*const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch, checking]);
    */

    if (checking) {
        return <h5>Espere...</h5>
    }

    

    return (
        <div className="app-container">
            <BrowserRouter>
                <NavBar />
                <div className="container">
                    <div className="app">
                        <Routes>
                            <Route path="/login" element={
                                <PublicRoute>
                                    <CoursesView />
                                </PublicRoute>
                            } />

                            <Route path="/courses" element={
                                <PrivateRoute>
                                    <CoursesView />
                                </PrivateRoute>
                            } />
                            <Route path="/courses/:id" element={
                                <PrivateRoute>
                                    <CourseView />
                                </PrivateRoute>
                            }
                            />
                            <Route path="/courses/buy/:id" element={
                                <PrivateRoute>
                                    <PayView />
                                </PrivateRoute>
                            }
                            />
                            <Route path="/learning" element={
                                <PrivateRoute>
                                    <StudentCoursesView />
                                </PrivateRoute>
                            }
                            />
                            <Route path="/learning/:id" element={
                                <PrivateRoute>
                                    <StudentCourseView />
                                </PrivateRoute>
                            }
                            />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}
