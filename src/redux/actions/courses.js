import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLoadCourses = () => {
    return async (dispatch) => {
        try {
            const resp = await noAuthFetch("courses/", {});
            const body = await resp.json();
            dispatch(setCourses(body))
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadCourse = (id) => {
    return async (dispatch) => {
        const resp = await noAuthFetch("course/" + id, {});
        const body = await resp.json();
        dispatch(setCourse(body));

        /*const tresp = await noAuthFetch("teacher/" + body.idTeacher, {});
        const tbody = await tresp.json();

        const course = {
            ...body,
            teacherPhone: tbody.phone,
            teacherEmail: tbody.email
        }*/


    }
}

export const setCourses = (courses) => ({
    type: types.coursesLoaded,
    payload: courses
});


export const setCourse = (course) => {
    return {
        type: types.courseSetActive,
        payload: course
    }
}

export const clearCourse = () => {
    return {
        type: types.courseCleanActive
    }
}

export const startLoadCoursesStudent = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        if (user) {
            const { id } = user;
            const resp = await authFetch("user/" + id + "/courses", {});
            const body = await resp.json();

            if (body !== null && body.length > 0) {
                body.map(course => course.isBought = true);
                dispatch(setCoursesStudent(body));

                const { myCourses } = getState().courses;

                if (myCourses) {
                    const rcourses = await noAuthFetch("course/", {});
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
            const resp = await authFetch("usercourse/save", { courseId: id, userId: uid }, "POST");
            const body = await resp.json();
            console.log(body);
            if (body.error) {
                Swal.fire("Error", "Error :CCC", "error");
            } else {
                Swal.fire("Success", "¡Curso comprado!", "success");
            }
        }
    }
}

export const startLoadCoursesTeacher = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        if (user) {
            const { id } = user;
            const resp = await authFetch("teacher/courses/" + id, {});
            const body = await resp.json();
            dispatch(setCourses(body));
        }
    }
}

export const clearAll = () => {
    return {
        type: types.clearAll
    }
}

export const startLoadCategories = () => {
    return async (dispatch) => {
        const resp = await authFetch("admin/categories", {});
        const body = await resp.json();
        dispatch(setCategories(body));
    }
}

export const setCategories = (categories) => {
    return {
        type: types.categoriesLoaded,
        payload: categories
    }
}

export const startLoadCoursesAdmin = () => {
    return async (dispatch) => {
        const resp = await authFetch("admin/courses", {});
        const body = await resp.json();
        dispatch(setCourses(body));
    }
}

export const startLoadTeachers = () => {
    return async (dispatch) => {
        const resp = await authFetch("admin/teachers", {});
        const body = await resp.json();
        dispatch(setTeachers(body));
    }
}

export const setTeachers = (teachers) => {
    return {
        type: types.teachersLoaded,
        payload: teachers
    }
}

export const startAddCategory = (category) => {
    return async (dispatch) => {
        const resp = await authFetch("admin/category/save", category, "POST");
        const body = await resp.json();
        if (body.error) {
            Swal.fire("Error", "Error :CCC", "error");
        } else {
            Swal.fire("Success", "¡Categoría agregada!", "success");
            dispatch(addCategory(body));
        }
    }
}

export const addCategory = (category) => {
    return {
        type: types.categoriesAddNew,
        payload: category
    }
}