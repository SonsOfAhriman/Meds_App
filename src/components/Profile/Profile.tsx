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
                    <h2 className="m-1"><span className="badge badge-secondary text-secondary">Hello {loggedInUser.user.email} </span> </h2>
                    <a href="#" onClick={getUserId} className="btn btn-primary m-2">See Prescriptions</a>

                    { prescriptions[0] ?
                        <ul className="list-group list-group-action m-2">
                            { prescriptions[0].map((item, index) => (
                                <li className="list-group-item list-group-item-action list-group-item-dark" > <b>Prescription name:</b> {item.prescription_name} <b>|</b> <b>Side effects:</b> { item.side_effects })</li>
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