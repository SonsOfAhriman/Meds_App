import React from "react";
import axios from "axios";
import UseForm from "../UseForm/UseForm";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import { ROOT_URL } from "../../apiRoot";
import "./Register.css";

const Register = () => {
    const { errors, values, handleChange, handleSubmit } = UseForm(register);
    const { userHasAuthenticated, setLoggedInUser } = useAppContext();
    const history = useHistory();


    async function register() {
        

        return await axios
            .post(`${ROOT_URL}api/v1/sign_up`, { "user": values })
            .then((response) => {
                localStorage.setItem("token", response.data.data.user.authentication_token);
                let parsedUser = JSON.parse(response.config.data);
                console.log(parsedUser);
                userHasAuthenticated(true);
                setLoggedInUser(parsedUser);
                history.push("/home");
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            });
    }

    return (
        <div className="container form-group">
            <h1 className="form-title">Registration</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    value={values.email || ""}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    id="email"
                    required={true}
                    className="form-control"
                />
                <label>Password</label>
                <input
                    value={values.password || ""}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    id="password"
                    required={true}
                    className="form-control"
                />
                <p className="errors">
                    {errors.password ? `${errors.password}` : null}
                </p>
                <label>Confirm Password</label>
                <input
                    value={values.confirmPassword || ""}
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    required={true}
                    className="form-control"
                />
                <p className="errors">
                    {errors.confirmPassword ? `${errors.confirmPassword}` : null}
                </p>
                <div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ margin: "20px" }}>
                        Submit
                    </button>
                </div>
            </form>

            <Link to="/home">
                <button className="btn btn-dark">Back to Home</button>{" "}
            </Link>
        </div>
    );
};

export default Register;