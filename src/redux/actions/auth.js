import Swal from "sweetalert2";
import { authFetch, noAuthFetch } from "../../helpers/fetch";
import { types } from "../types/types";
import jwtDecode from "jwt-decode";
import { clearAll } from "./courses";

export const getUser = (email) => {
    return async (dispatch) => {
        try {
            const response = await authFetch("user/" + email, {});
            const body = await response.json();
            dispatch(setUser(body));
        } catch (error) {
            console.log(error);
        }
    }
}

export const setUser = (user) => ({
    type: types.authLogin,
    payload: user
});


export const startLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const resp = await noAuthFetch(`login?email=${email}&password=${password}`, {}, "POST");
            const body = await resp.json();

            if (body.error) {
                Swal.fire("Error", body.error, "error");
            }

            if (body.access_token) {
                localStorage.setItem("token", body.access_token);
                localStorage.setItem("token-refresh", body.refresh_token);
                localStorage.setItem("token-init-date", new Date().getTime());

                dispatch(getUser(email));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startRegister = (email, password, name, lastName) => {
    return async (dispatch) => {
        try {
            const resp = await noAuthFetch("api/register", { email, password, name, lastName }, "POST");
            const body = await resp.json();

            if (body.error) {
                Swal.fire("Error", body.error, "error");
            } else {
                dispatch(startLogin(email, password));
                dispatch(getUser(email));
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
                Swal.fire("Error", body.error, "error");
                dispatch(checkingFinish()); // para que no se quede en el loading
            }
        } else {
            dispatch(checkingFinish());
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

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-refresh");
        localStorage.removeItem("token-init-date");
        dispatch(logout());
        dispatch(clearAll());
    }
}

const logout = () => ({
    type: types.authLogout
});