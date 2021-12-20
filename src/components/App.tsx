import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Navbar from './Screens/Navbar';
import Profile from './Profile/Profile';
import Register from "./Register/Register";
import Login from "./Login/Login";
import { AppContext, useAppContext } from "../libs/contextLib";
import jwtDecode from "jwt-decode";
import PrivateRoute from './Routing/PrivateRoute';
import axios from "axios";
import { ROOT_URL } from "../apiRoot";
import UseForm from "./UseForm/UseForm";




function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [jwt, setJwt] = useState(() => localStorage.getItem('token'));
  const [currentlyAuthenticating, setCurrentlyAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [headers, setHeaders] = useState<Object>({});

  // console.log(localStorage);

 
  useEffect(() => {
    if (localStorage.getItem('token')) {
      login();
    }
  }, []); 

  async function login() {
    await axios
      .post(`${ROOT_URL}api/v1/sign_in`, { "user": { "email": localStorage.getItem("email"), "password": localStorage.getItem("password") }})
      .then((response) => {

        localStorage.setItem("token", response.data.data.user.authentication_token);
        let parsedUser = JSON.parse(response.config.data);
        setLoggedInUser(parsedUser);
        localStorage.setItem('email', parsedUser.user.email)
        localStorage.setItem('password', parsedUser.user.password)
        userHasAuthenticated(true);
        setJwt(localStorage.getItem("token"));
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  }


  return (
    (
      <div>
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            loggedInUser,
            setLoggedInUser,
            jwt,
            setJwt,
            headers,
            setHeaders,
          }}>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
  
          </Switch>
        </AppContext.Provider>
      </div>
    )
  )
}

export default App;
