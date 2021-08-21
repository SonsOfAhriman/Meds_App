import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Screens/Home';


function App() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
