import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import jwtDecode from "jwt-decode";
import { clearAll } from "./courses";
import { startLoadCoursesStudent } from "./student";
import { startLoadCoursesTeacher } from "./teachers";
import { startLoadCategories, startLoadCoursesAdmin, startLoadTeachers } from "./admin";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";


export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await noAuthFetch(`login?email=${email}&password=${password}`, {}, "POST");
        if (resp.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo o contraseña incorrectos',
            });
        } else {
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            }
            if (body.access_token) {
                localStorage.setItem("token", body.access_token);
                localStorage.setItem("token-refresh", body.refresh_token);
                localStorage.setItem("token-init-date", new Date().getTime());
                dispatch(getUser(body.email));
            }
        }
    }
}

export const startRegister = (user) => {
    return async (dispatch) => {
        try {
            const resp = await noAuthFetch("register", user, "POST");
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            } else {
                dispatch(startLogin(user.email, user.password));
                dispatch(getUser(user.email));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        if (localStorage.getItem("token")) {
            const resp = await authFetch("token/refresh", {});
            const body = await resp.json();
            if (body.access_token) {
                localStorage.setItem("token", body.access_token);
                localStorage.setItem("token-refresh", body.refresh_token);
                localStorage.setItem("token-init-date", new Date().getTime());
                const { sub } = jwtDecode(body.access_token);
                dispatch(getUser(sub));
                dispatch(checkingFinish()); // para que no se quede en el loading
            } else {
                dispatch(checkingFinish()); // para que no se quede en el loading
            }
        } else {
            dispatch(checkingFinish());
        }
        //  dispatch(startLoadCourses());

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-refresh");
        localStorage.removeItem("token-init-date");
        localStorage.removeItem("lastPath");
        dispatch(logout());
        dispatch(clearAll());
    }
}

const logout = () => ({
    type: types.authLogout
});


export const getUser = (email) => {
    return async (dispatch) => {
        try {
            const response = await authFetch("user/" + email, {});
            const body = await response.json();
            dispatch(setUser(body.user));
            if (body.user.role === 1) {
                dispatch(startLoadCoursesStudent());
            } else if (body.user.role === 2) {

                if (body.user.status === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Su solicitud de registro está en proceso de aprobación...',
                    });
                    dispatch(startLogout());
                    return;
                } else if (body.user.status === -1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Su solicitud de registro fue rechazada...',
                    });
                    dispatch(startLogout());
                    return;
                }


                dispatch(setDocuments(body.docs));
                dispatch(startLoadCoursesTeacher(body.id));



            } else if (body.user.role === 3) {
                dispatch(startLoadCoursesAdmin());
                dispatch(startLoadTeachers());
                dispatch(startLoadCategories());
            }

            dispatch(startLoadNotifications());
        } catch (error) {
            console.log(error);
        }
    }
}

export const saveUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await authFetch("user/update", user, "PUT");
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            } else {
                dispatch(setUser(body));
                Swal.fire("Exito", "Se actualizo correctamente", "success");
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const setUser = (user) => ({
    type: types.authLogin,
    payload: user
});

export const setDocuments = (docs) => ({
    type: types.setDocs,
    payload: docs
});


export const startChangePassword = (user, password, newPassword) => {
    return async (dispatch) => {
        const resp = await noAuthFetch(`login?email=${user.email}&password=${password}`, {}, "POST");
        console.log(resp);
        if (resp.status === 403) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña actual es incorrecta',
            });
        } else {
            const body = await resp.json();
            if (body.error) {
                Swal.fire("Error", body.error, "error");
            }
            if (body.access_token) {
                localStorage.setItem("token", body.access_token);
                localStorage.setItem("token-refresh", body.refresh_token);
                localStorage.setItem("token-init-date", new Date().getTime());

                const resp = await authFetch("user/update-password/" + user.id, { password: newPassword }, "PUT");
                const bodyPassword = await resp.json();
                if (bodyPassword.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: body.error,
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito',
                        text: "Contraseña actualizada correctamente.",
                    });
                }
            }
        }
    }

}




export const startLoadNotifications = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        if (user) {
            const { id } = user;
            const docRef = doc(db, "notifications", "" + id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists) {
                const data = docSnap.data();
                if (data) {
                    dispatch(setNotifications(data.notifications));
                }
            }
        }
    }
}



export const setNotifications = (notifications) => {
    return {
        type: types.loadNotifications,
        payload: notifications
    }
}