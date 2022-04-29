import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLoadCourses = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await noAuthFetch("course/", {});
            const body = await resp.json();
            dispatch(setCourses(body))

            /*const { myCourses } = getState().courses;
            if (myCourses) {
                body.map(course => myCourses.map(myCourse => course.id === myCourse.id ? course.isBought = true : null));
                dispatch(setCourses(body));
            }*/
        } catch (error) {
            console.log(error);
        }
    }
}

export const setCourses = (courses) => ({
    type: types.coursesLoaded,
    payload: courses
});


export const startLoadCourse = (id) => {
    return async (dispatch) => {
        const resp = await noAuthFetch("course/" + id, {});
        const body = await resp.json();

        const tresp = await noAuthFetch("teacher/" + body.idTeacher, {});
        const tbody = await tresp.json();

        const course = {
            ...body,
            teacherPhone: tbody.phone,
            teacherEmail: tbody.email
        }

        dispatch(setCourse(course))
    }
}


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
            const resp = await authFetch("course/user/" + id, {});
            const body = await resp.json();
            
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
            const { teacherId:id } = user;
            const resp = await authFetch("course/teacher/" + id, {});
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