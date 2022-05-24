import Swal from "sweetalert2";
import { authFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import { setCourses } from "./courses";
import { storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getUser } from "./auth";

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
            if (body.status === 200) {
                const courses = body.courses.filter(course => course.status !== -2);
                dispatch(setCourses(courses));
            }
        }
    }
}


export const startAddCourse = (course, del) => {
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
            if (del) {
                return dispatch(startLoadCoursesTeacher());
            }
            Swal.fire("Success", "¡Curso agregado!", "success");
            dispatch(startLoadCoursesTeacher());
        }
    }
}

export const startDeleteCourse = (id) => {
    return async (dispatch) => {
        const resp = await authFetch("teacher/course/delete/" + id, {}, "DELETE");
        const body = await resp.json();
        if (body.error) {
            return Swal.fire("Error", "Error :CCC", "error");
        }
        Swal.fire("Success", "¡Curso eliminado!", "success");
        dispatch(startLoadCoursesTeacher());
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

export const startUploadFile = (user, files, setLoading) => {
    return async (dispatch) => {
        try {
            const urls = await Promise.all(
                files.map(async file => {
                    const filePath = `docs/${user.id}/${file.name}`;
                    const fileRef = ref(storage, filePath)
                    await uploadBytesResumable(fileRef, file);
                    const url = await getDownloadURL(fileRef);
                    return {
                        url,
                        name: file.name
                    };
                })
            )

            await Promise.all(
                urls.map(async url => {
                    await authFetch("teacher/document/save", {
                        url: url.url,
                        name: url.name,
                        teacher: user
                    }, "POST");
                })
            );

            setLoading(false);
            dispatch(getUser(user.email));

        } catch (error) {
            console.log(error);
        }
    }
}