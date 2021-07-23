import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import BRegister from "./BRegister";
import Order from "./Order";
import Client from './Client';
function App() {
  // exact component default Home
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
        <div className="page">
          <Route path="/" exact component={Client}/> 
          <Route path="/register" exact component={BRegister}/> 
          <Route path="/home" component={Home}/>
          <Route path="/sign-in" component={Login}/>
          <Route path="/sign-up" component={SignUp}/>
        </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

