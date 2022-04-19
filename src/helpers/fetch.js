const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = "GET") => {
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

const fetchConToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
    if (method === "GET") {
        return fetch(url, {
            method,
            headers: {
                "x-token": localStorage.getItem("token") || ""
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                "Content-type": "application/json",
                "x-token": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    fetchSinToken,
    fetchConToken
}