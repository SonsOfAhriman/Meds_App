import "./Home.css";
import { MenuItems } from "./MenuItems";
import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../libs/contextLib";
import { Button } from "./Button";




function Navbar() {

    const [clicked, setClicked] = useState(false);

    const logIn = ["Log In", "/login"];
    const logOut = ["Log Out", "#", "logout"];
    const signUp = ["Sign Up", "/register"];

    const { loggedInUser, setLoggedInUser } = useAppContext();

    const handleClick = () => {
        setClicked(!clicked);
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div>
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Medi App</h1>
                <div className="menu-icon" onClick={handleClick} >
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"} ></i>
                </div>
                <ul className={clicked ? "nav-menu active" : "nav-menu"} >
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>


                        )
                    })}
                    {loggedInUser ?
                        <li>
                            <a className={"nav-links-mobile"} onClick={logout}>
                                Log Out
                            </a>
                        </li>
                        :
                        <div>
                            <li>
                                <a className={"nav-links-mobile"} href="/login">
                                    Log In
                                </a>
                            </li>
                            <li>
                                <a className={"nav-links-mobile"} href="/signup">
                                    Sign Up
                                </a>
                            </li>
                        </div>


                    }
                    {loggedInUser ?
                        <div className="button-class">
                            <Button buttonSize={""} buttonStyle={""} props={logOut} />
                        </div>

                        :
                        <div className="flex">
                            <div className="button-class right">
                                <Button buttonSize={""} buttonStyle={""} props={logIn} />
                            </div>
                            <div className="button-class">
                                <Button buttonSize={""} buttonStyle={""} props={signUp} />
                            </div>
                        </div>
                    }
                </ul>


            </nav>
        </div>
    )
}

export default Navbar;