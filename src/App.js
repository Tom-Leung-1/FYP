import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Home";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
        <div className="page">
          <Route path="/" exact component={Home}/>
          <Route path="/home" component={Home}/>
        </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

