const storeToken = (value) => {
    if (value) {
        localStorage.setItem("access_token", value.access_token)
        localStorage.setItem("refresh_token", value.refresh)
    }
}

const getToken = () => {
    let access_token = localStorage.getItem("access_token")
    let refresh_token = localStorage.getItem("refresh_token")
    return {access_token, refresh_token}
}

const removeToken = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
}


export {storeToken, getToken, removeToken}