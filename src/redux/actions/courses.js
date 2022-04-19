import {  noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLoadCourses = () => {
    return async (dispatch) => {
        const resp = await noAuthFetch("course/", {});
        const body = await resp.json();
        dispatch(setCourses(body))
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
        //verifiy session token
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
