import Swal from "sweetalert2";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import { setCourses } from "./courses";
import { sendNotification } from "../../helpers/firebase";

export const startLoadCategories = () => {
    return async (dispatch) => {
        const resp = await authFetch("categories", {});
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

export const startSetTeacherStatus = (teacher) => {
    return async (dispatch) => {
        const resp = await authFetch("admin/teacher/" + teacher.id + "/status/" + teacher.status, {}, "PUT");
        const body = await resp.json();
        if (body.status === 200) {
            dispatch(updateTeacher(teacher));

            if(teacher.status === -1)
                return;
                //senEmail

            sendNotification({
                title: "¡Bienvenido!",
                message: "¡Saludos! " + teacher.name + " " + teacher.lastName + ". ¡Has sido aceptado como profesor de Coursite!.",
                type: "success",
                icon: "success",
                status: 0
            }, teacher.id);
            

            Swal.fire("Success", "¡Status actualizado!", "success");
        } else {
            Swal.fire("Error", "Error :CCC", "error");
        }
    }
}

export const updateTeacher = (teacher) => {
    return {
        type: types.teachersUpdated,
        payload: teacher
    }
}

export const startSetCourseStatus = (course) => {
    return async (dispatch) => {
        const resp = await authFetch("admin/course/" + course.id + "/status/" + course.status, {}, "PUT");
        const body = await resp.json();
        
        if (body.status === 200) {
            dispatch(updateCourse(course));
            sendNotification({
                title: "Status de tu curso",
                message: "¡Saludos! " + course.teacher.name + " " + course.teacher.lastName + ", tu curso llamado '" + course.title + "' ha sido " + (course.status === 1 ? "aprobado" : "rechazado"),
                type: course.status === 1 ? "success" : "danger",
                icon: course.status === 1 ? "success" : "danger",
                status: 0
            }, course.teacher.id);

            Swal.fire("Success", "¡Status actualizado!", "success");
        } else {
            Swal.fire("Error", "Error :CCC", "error");
        }
    }
}

export const updateCourse = (course) => {
    return {
        type: types.courseUpdated,
        payload: course
    }
}

export const startGetTeacher = (id) => {
    return async (dispatch) => {
        const resp = await authFetch("admin/teacher/" + id, {});
        const body = await resp.json();
        dispatch(setTeacher(body));
    }
}

export const setTeacher = (teacher) => {
    return {
        type: types.teacherSetActive,
        payload: teacher
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

export const startUpdateCategory = (category) => {
    return async (dispatch) => {
        const resp = await authFetch("admin/category/update", category, "PUT");
        const body = await resp.json();
        if (body.error) {
            Swal.fire("Error", "Error :CCC", "error");
        } else {
            Swal.fire("Success", "¡Categoría actualizada!", "success");
            dispatch(updateCategory(body));
        }
    }
}

export const updateCategory = (category) => {
    return {
        type: types.categoriesUpdated,
        payload: category
    }
}


export const startLoadStats = () => {
    return async (dispatch) => {
        const resp = await authFetch("admin/stats", {});
        const body = await resp.json();
        dispatch(setStats(body));
    }
}

export const setStats = (stats) => {
    return {
        type: types.loadStats,
        payload: stats
    }
}