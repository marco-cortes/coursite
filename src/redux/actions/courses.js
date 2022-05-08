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

            if (body !== null) {
                body.map(course => course.isBought = true);
                dispatch(setCoursesStudent(body));

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

export const clearAll = () => {
    return {
        type: types.clearAll
    }
}

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
