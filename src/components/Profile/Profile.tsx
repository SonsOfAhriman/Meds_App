import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../libs/contextLib";
import { ROOT_URL } from "../../apiRoot";
import axios from "axios";


function Profile() {

    const [totalUsers, setTotalUsers] = useState([]);
    const { userHasAuthenticated, loggedInUser } = useAppContext();

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        console.log(loggedInUser);
    }



    return (
        <div>Hello</div>
    )
}

export default Profile;