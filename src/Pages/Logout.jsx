import React from 'react';
import { getUserToken, LogoutUser } from '../API/LocalStore';

const Logout = () => {

    if (getUserToken() !== null) {
        LogoutUser();
        window.location.href = "/login"
    }

    return (
        <div>
            <h1>You have Successfully Logout</h1>
        </div>
    );
}

export default Logout;
