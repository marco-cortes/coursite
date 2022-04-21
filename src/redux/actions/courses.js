import Swal from "sweetalert2";
import { noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLoadCourses = () => {
    return async (dispatch,getState) => {
        
        const resp = await noAuthFetch("course/", {});
        const body = await resp.json();
        dispatch(setCourses(body))
        const { myCourses } = getState().courses;
        if(myCourses) {
            body.map(course => myCourses.map(myCourse => course.id === myCourse.id ? course.isBought = true : null));
            dispatch(setCourses(body));
        }
    }
}

export const setCourses = (courses) => ({
    type: types.coursesLoaded,
    payload: courses
});


export const startLoadCourse = (id) => {
    return async (dispatch) => {
        dispatch(clearCourse());
        const resp = await noAuthFetch("course/" + id, {});
        const body = await resp.json();
        dispatch(setCourse(body))
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
            const resp = await noAuthFetch("course/user/" + id, {});
            const body = await resp.json();
            dispatch(setCoursesStudent(body))

            const { courses } = getState().courses;
            courses.map(course => body.map(myCourse => course.id === myCourse.id ? course.isBought = true : null));
            dispatch(setCourses(courses));
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
            const resp = await noAuthFetch("usercourse/save", { courseId: id, userId: uid }, "POST");
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