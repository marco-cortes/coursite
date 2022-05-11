import Swal from "sweetalert2";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import { setCourses } from "./courses";

export const setUnitActive = (unit) => {
    return {
        type: types.setUnitActive,
        payload: unit
    }
}

export const setLessonActive = (lesson) => {
    return {
        type: types.setLessonActive,
        payload: lesson
    }
}

export const cleanUnit = () => {
    return {
        type: types.unitCleanActive
    }
}

export const cleanLesson = () => {
    return {
        type: types.lessonCleanActive
    }
}


export const startLoadCoursesTeacher = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        if (user) {
            const { id } = user;
            const resp = await authFetch("teacher/courses/" + id, {});
            const body = await resp.json();
            if (body.status === 200)
                dispatch(setCourses(body.courses));
        }
    }
}


export const startAddCourse = (course, teacher) => {
    return async (dispatch) => {
        course.idCategory = parseInt(course.idCategory);
        course.units = course.units.map(u => ({
            ...u,
            uuid: null,
            lessons: u.lessons.map(l => ({
                ...l,
                uuid: null,
            }))
        })
        );
        const resp = await authFetch("teacher/course/new", course, "POST");
        const body = await resp.json();
        if (body.error) {
            Swal.fire("Error", "Error :CCC", "error");
        } else {
            Swal.fire("Success", "¡Curso agregado!", "success");
            dispatch(startLoadCoursesTeacher(teacher));
        }
    }
}

export const addCourse = (course) => {
    return {
        type: types.courseAddNew,
        payload: course
    }
}

export const startDeleteUnit = (unit) => {
    return async (dispatch) => {
        const resp = await authFetch("teacher/course/unit/delete/" + unit, {}, "DELETE");
        const body = await resp.json();
        if (body.error) {
            Swal.fire("Error", "Error :CCC", "error");
        } else {
            Swal.fire("Success", "¡Unidad eliminada!", "success");
        }
    }
}

export const startDeleteLesson = (lesson) => {
    return async (dispatch) => {
        const resp = await authFetch("teacher/course/lesson/delete/" + lesson, {}, "DELETE");
        const body = await resp.json();
        if (body.error) {
            Swal.fire("Error", "Error :CCC", "error");
        } else {
            Swal.fire("Success", "¡Lección eliminada!", "success");
        }
    }
}
