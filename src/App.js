import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/NewNavbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import BRegister from "./BRegister";
import Searching from "./Searching";
import MealMenu from "./MealMenu";
import BookingStatus from "./BookingStatus";
import TableStatus from "./TableStatus";
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
          <Route path="/menu">
             <MealMenu restaurantId="0"/>
          </Route>
          <Route path="/booking" component={BookingStatus} />
          <Route path="/table" component={TableStatus} />
          <Route path="/register" component={BRegister} />
          <div className="page">
            <Navbar />
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/search" component={Searching} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/detail" component={Detail} />
            <Route path="/client" component={Client} />
            <Route path="/new">
              <ClientOrder restaurantId="0" restaurantName="Horlicks"/>
            </Route>

          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

