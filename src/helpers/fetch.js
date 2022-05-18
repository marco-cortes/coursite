//const baseUrl = "http://localhost:8080/api";
const baseUrl = "https://coursite.herokuapp.com/api";

const noAuthFetch = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
    if (method === "GET") {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
}

const authFetch = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
    if (method === "GET") {
        return fetch(url, {
            method,
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    noAuthFetch,
    authFetch
}