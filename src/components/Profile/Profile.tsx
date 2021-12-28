import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../libs/contextLib";
import { ROOT_URL } from "../../apiRoot";
import axios from "axios";


function Profile() {

    const [totalUsers, setTotalUsers] = useState([]);
    const { userHasAuthenticated, loggedInUser } = useAppContext();
    const [ prescriptions, setPrescriptions ] = useState([]);
    const [userId, setUserId] = useState([]);


    const getUserId = () => {

       axios.get(`${ROOT_URL}api/v1/users`, { params: { email: loggedInUser.user.email } })
            .then(resp => {

                setUserId(resp.data.find(element => element.email === loggedInUser.user.email).id);
            })
            .then(resp => {
                getPrescriptions();
            })
    }

    const getPrescriptions = () => {
        if (userId.length !== 0) {
            axios.get(`${ROOT_URL}api/v1/users/${userId}`)
                .then(resp => {
                    // console.log(resp);
                    setPrescriptions(Object.values(resp.data));
                })
        }

    }


    return (
        <div>
            { loggedInUser ?
                <div> 
                    <div>Hello {loggedInUser.user.email} </div>
                    <a href="#" onClick={getUserId} className="btn btn-primary">See Prescriptions</a>

                    { prescriptions[0] ?
                        <ul>
                            { prescriptions[0].map((item, index) => (
                            <li>prescription name: { item.prescription_name } | side effects: { item.side_effects })</li>
                            ))}
                        </ul>
                    
                        :
                        ""
                    }
{/* 
                 { prescriptions.length > 0 ? 
                   
                    <ul>
                        { Object.keys(prescriptions).map((property) => (
                            <li> {property} </li>
                        ))}
                    </ul>
                    :
                    ""
                } */}
 
                </div>
            : 
                <div>Unknown user</div>
            }
        </div>
    )
}

export default Profile;