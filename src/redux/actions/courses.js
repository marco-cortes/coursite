import { noAuthFetch } from "../../helpers/fetch";
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
    return async (dispatch, getState) => {
        const resp = await noAuthFetch("course/" + id, {});
        const body = await resp.json();
        dispatch(setCourse(body));
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

export const clearAll = () => {
    return {
        type: types.clearAll
    }
}
