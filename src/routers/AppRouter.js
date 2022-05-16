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
import { StudentRoute } from "./StudentRoute";
import { TeacherRoute } from "./TeacherRoute";
import { AdminRoute } from "./AdminRoute";
import { PublicRoute } from "./PublicRoute";
import { ProfileView } from "../components/views/ProfileView";
import { Login } from "../components/auth/Login";
import { Container } from "../components/ui/Container";
import { Register } from "../components/auth/Register";
import { AdminCourses } from "../components/admin/AdminCourses";
import { AdminTeachers } from "../components/admin/AdminTeachers";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminTeacher } from "../components/admin/AdminTeacher";
import { AdminCategories } from "../components/admin/AdminCategories";
import { NewCourse } from "../components/teacher/NewCourse";
import { EditCourse } from "../components/teacher/EditCourse";
import { TeacherRegister } from "../components/teacher/TeacherRegister";
import { TeacherRegisterRoute } from "./TeacherRegisterRoute";
import { HomeView } from "../components/views/HomeView";
import { AboutView } from "../components/views/AboutView";
import { ServicesView } from "../components/views/ServicesView";
import { View404 } from "../components/views/View404";

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    const { checking } = useSelector(state => state.auth);

    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <HomeView />
                    }
                    />
                    <Route path="/about" element={
                        <AboutView />
                    }
                    />
                    <Route path="/services" element={
                        <ServicesView />
                    }
                    />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register role={1} />
                        </PublicRoute>
                    } />
                    <Route path="/teacher/register" element={
                        <PublicRoute>
                            <Register role={2} />
                        </PublicRoute>
                    } />
                    <Route path="/admin/register" element={
                        <PublicRoute>
                            <Register role={3} />
                        </PublicRoute>
                    } />
                    <Route path="/courses" element={
                        <PublicRoute>
                            <Container>
                                <CoursesView role={0} />
                            </Container>
                        </PublicRoute>
                    } />

                    <Route path="/courses/:id" element={
                        <PublicRoute>
                            <Container>
                                <CourseView role={0} />
                            </Container>
                        </PublicRoute>
                    } />
                    <Route path="/student/courses" element={
                        <StudentRoute>
                            <Container>
                                <CoursesView role={1} />
                            </Container>
                        </StudentRoute>
                    } />
                    <Route path="/student/courses/:id" element={
                        <StudentRoute>
                            <Container>
                                <CourseView role={1} />
                            </Container>
                        </StudentRoute>
                    }
                    />
                    <Route path="/student/courses/buy/:id" element={
                        <StudentRoute>
                            <Container>
                                <PayView />
                            </Container>
                        </StudentRoute>
                    }
                    />
                    <Route path="/student/learning" element={
                        <StudentRoute>
                            <Container>
                                <StudentCoursesView />
                            </Container>
                        </StudentRoute>
                    }
                    />
                    <Route path="/student/learning/:id" element={
                        <StudentRoute>
                            <Container>
                                <StudentCourseView />
                            </Container>
                        </StudentRoute>
                    }
                    />
                    <Route path="/student/profile" element={
                        <StudentRoute>
                            <Container>
                                <ProfileView />
                            </Container>
                        </StudentRoute>
                    }
                    />
                    <Route path="/teacher/register/finish" element={
                        <TeacherRegisterRoute>
                            <TeacherRegister />
                        </TeacherRegisterRoute>
                    }
                    />
                    <Route path="/teacher/courses" element={
                        <TeacherRoute>
                            <Container>
                                <CoursesView role={2} />
                            </Container>
                        </TeacherRoute>
                    }
                    />
                    <Route path="/teacher/courses/:id" element={
                        <TeacherRoute>
                            <Container>
                                <CourseView role={2} />
                            </Container>
                        </TeacherRoute>
                    }
                    />
                    <Route path="/teacher/courses/:id/edit" element={
                        <TeacherRoute>
                            <Container>
                                <EditCourse />
                            </Container>
                        </TeacherRoute>
                    }
                    />
                    <Route path="/teacher/courses/new" element={
                        <TeacherRoute>
                            <Container>
                                <NewCourse />
                            </Container>
                        </TeacherRoute>
                    }
                    />
                    <Route path="/teacher/profile" element={
                        <TeacherRoute>
                            <Container>
                                <ProfileView role={2} />
                            </Container>
                        </TeacherRoute>
                    }
                    />
                    <Route path="/admin/courses" element={
                        <AdminRoute>
                            <Container>
                                <AdminCourses />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/teachers" element={
                        <AdminRoute>
                            <Container>
                                <AdminTeachers />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/categories" element={
                        <AdminRoute>
                            <Container>
                                <AdminCategories />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/courses/:id" element={
                        <AdminRoute>
                            <Container>
                                <StudentCourseView />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/teachers/:id" element={
                        <AdminRoute>
                            <Container>
                                <AdminTeacher />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/" element={
                        <AdminRoute>
                            <Container>
                                <AdminDashboard />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="/admin/profile" element={
                        <AdminRoute>
                            <Container>
                                <ProfileView />
                            </Container>
                        </AdminRoute>
                    }
                    />
                    <Route path="*" element={
                        <View404 />
                    } />
                </Routes>
            </BrowserRouter>
        </>
    )
}
