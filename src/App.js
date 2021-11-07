import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/NewNavbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import BRegister from "./BRegister";
import mealMenu from "./mealMenu";
import Order from "./Order";
import Client from './Client';
import Detail from "./components/Detail/Detail";
import ClientOrder from './ClientOrder';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css"></link>
        </Helmet>

        <Switch>
          <Route path="/test" component={mealMenu} />
          <Route path="/register" component={BRegister} />
          <Route path="/client" component={Client} />
          <div className="page">
            <Navbar />
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/detail" component={Detail} />
            <Route path="/new">
              <ClientOrder restaurantName="Horlicks!!"/>
            </Route>

          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

