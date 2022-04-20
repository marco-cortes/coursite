import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";

export const getUser = () => {
    return async (dispatch) => {
        try {
            const response = await noAuthFetch("user/1");
            const body = await response.json();
            console.log(body);
            /*dispatch({
                type: types.authUser,
                payload: user
            });*/
        } catch (error) {
            console.log(error);
        }
    }
}


export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await noAuthFetch("auth", { email, password }, "POST");
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem("token", body.user.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(login({
                uid: body.user.uid,
                name: body.user.name
            }));
        } else {
            if (body.errors) {
                if (body.errors.password)
                    Swal.fire("Error", body.errors.password.msg, "error");
                if (body.errors.email)
                    Swal.fire("Error", body.errors.email.msg, "error");
            } else {
                Swal.fire("Error", body.message, "error");
            }
        }
    }
}

export const login = (user) => ({
    type: types.authLogin,
    payload: user
});


export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await noAuthFetch("auth/new", { email, password, name }, "POST");
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem("token", body.user.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(login({
                uid: body.user.uid,
                name: body.user.name
            }));
        } else {
            if (body.errors) {
                if (body.errors.password)
                    Swal.fire("Error", body.errors.password.msg, "error");
                if (body.errors.email)
                    Swal.fire("Error", body.errors.email.msg, "error");
                if (body.errors.name)
                    Swal.fire("Error", body.errors.name.msg, "error");
            } else {
                Swal.fire("Error", body.message, "error");
            }
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        if (localStorage.getItem("token")) {
            const resp = await authFetch("auth/renew", {});
            const body = await resp.json();
            if (body.ok) {
                localStorage.setItem("token", body.user.token);
                localStorage.setItem("token-init-date", new Date().getTime());
                dispatch(login({
                    uid: body.user.uid,
                    name: body.user.name
                }));
            } else {
                Swal.fire("Error", body.message, "error");
                dispatch(checkingFinish()); // para que no se quede en el loading
            }
        } else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-init-date");
        dispatch(logout());
        dispatch(eventsClear());
    }
}

const eventsClear = () => ({
    type: types.eventClear
});


const logout = () => ({
    type: types.authLogout
});