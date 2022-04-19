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
//import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

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
                            <Route path="/login" element={
                                <PublicRoute>
                                    <CoursesView />
                                </PublicRoute>
                            } />

                            <Route path="/courses" element={
                                <PublicRoute>
                                    <CoursesView />
                                </PublicRoute>
                            } />
                            <Route path="/courses/:id" element={
                                <PublicRoute>
                                    <CourseView />
                                </PublicRoute>
                            }
                            />
                            <Route path="/courses/buy/:id" element={
                                <PublicRoute>
                                    <PayView />
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
