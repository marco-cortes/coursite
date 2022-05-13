import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import { setCourse, setCourses } from "./courses";


export const startLoadCoursesStudent = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        if (user) {
            const { id } = user;
            const resp = await authFetch("user/" + id + "/courses", {});
            const body = await resp.json();

            if (body !== null) {
                let courses = body.map(c => ({
                    category: c.course.category,
                    description: c.course.description,
                    id: c.course.id,
                    idCategory: c.course.idCategory,
                    idTeacher: c.course.idTeacher,
                    image: c.course.image,
                    price: c.course.price,
                    score: c.course.score,
                    status: c.course.status,
                    teacher: c.course.teacher,
                    teacherEmail: c.course.teacherEmail,
                    phone: c.course.teacherPhone,
                    title: c.course.title,
                    progress: c.progress,
                    isBought: true
                }));

                dispatch(setCoursesStudent(courses));

                const { myCourses } = getState().courses;

                if (myCourses) {
                    const rcourses = await noAuthFetch("courses/", {});
                    const rbody = await rcourses.json();
                    rbody.map(course => myCourses.map(myCourse => course.id === myCourse.id ? course.isBought = true : null));
                    dispatch(setCourses(rbody));
                }
            }

        }
    }
}

export const setCoursesStudent = (courses) => {
    return {
        type: types.myCoursesLoaded,
        payload: courses
    }
}

export const startBuyCourse = (id) => {
    return async (dispatch, getState) => {
        const { id: uid } = getState().auth.user;
        id = parseInt(id);
        if (uid) {
            const resp = await authFetch("user/course/save", { courseId: id, userId: uid }, "POST");
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", "Error :CCC", "error");
            } else {
                dispatch(startLoadCoursesStudent());
                Swal.fire("Success", "¡Curso comprado!", "success");
            }

        }
    }
}

export const saveUserCourse = (course) => {
    return async (dispatch) => {
        try {
            const resp = await authFetch("user/course/save", course, "POST");
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            } else {
                dispatch(startLoadCoursesStudent());
                Swal.fire("Exito", "Acción realizada correctamente", "success");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadUserCourse = (course, user) => {
    return async (dispatch, getState) => {
        try {
            const resp = await authFetch("user/course/" + course + "/info/" + user, {});
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            } else {
                const { active } = getState().courses;
                if (active) {
                    dispatch(setCourse({
                        ...active,
                        score: body.score,
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}