function saveUserToken(token, remember) {
    if (remember) {
        localStorage.setItem('user_token', token)
        sessionStorage.removeItem('user_token');
    } else {
        sessionStorage.setItem('user_token', token);
        localStorage.removeItem('user_token');
    }
}

function getUserToken() {

    var token = localStorage.getItem('user_token');
    if (token !== null) {
        return token;
    } else {
        token = sessionStorage.getItem('user_token');
        if (token !== null) {
            return token;
        }
    }
}

function LogoutUser() {
    console.log("LOgout");
    localStorage.removeItem('user_token');
    sessionStorage.removeItem('user_token');
}

const getFlag = (country) => {
    if (country === "KSA")
        country = "Saudi%20Arabia";
    else if (country === "UAE")
        country = "United%20Arab%20Emirates";
    return "https://countryflagsapi.com/png/" + country;
}

export { saveUserToken, getUserToken, LogoutUser, getFlag }