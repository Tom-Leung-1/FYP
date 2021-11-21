import React, {Component} from 'react';
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
import BookingSetting from "./BookingSetting";
import Order from "./Order";
import OrderList from "./OrderList";
import Client from './Client';
import Detail from "./components/Detail/Detail";
import ClientOrder from './ClientOrder';
import PaymentChoice from './PaymentChoice';
import DoneOrder from './DoneOrder';
import OwnerOption from './OwnerOption';
import RProfile from './RProfile';
import RecentOrder from './RecentOrder';
import RecentBooking from './RecentBooking';
import ClientOption from './ClientOption';
import UProfile from './UProfile';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTag : "",
      lat : -1,
      lng : -1,
      photo : "",
      description : "",
      restaurant: "",
      address: "",
    };
  }
  
  searchUpdate = (searchTag) => {
    console.log(searchTag)
    this.setState({searchTag})
  }

  selectRestaurant = (datum) => {
    const {lat, lng, photo, restaurant, address, description} = datum
    this.setState({lat, lng, photo, restaurant, address, description})
  }

  render() {
    const {searchTag, lat, lng, photo, description, restaurant, address} = this.state
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
            <Route path="/booksetting" component={BookingSetting} />
            <Route path="/register" component={BRegister} />
            <Route path="/pay" component={PaymentChoice} />
            <Route path="/doneOrder" component={DoneOrder} />
            <Route path="/OwnerOption" component={OwnerOption} />
            <Route path="/rprofile" component={RProfile} />
            <Route path="/orderlist" component={OrderList} />
            <Route path="/ClientOption" component={ClientOption} />
            <Route path="/uprofile" component={UProfile} />
            <div className="page">
              <Navbar />
              <Route path="/" exact>
                <Home selectRestaurant={this.selectRestaurant} searchUpdate={this.searchUpdate}/>
              </Route>
              <Route path="/home">
                <Home selectRestaurant={this.selectRestaurant} searchUpdate={this.searchUpdate}/>
              </Route>
              <Route path="/search">
                <Searching selectRestaurant={this.selectRestaurant} searchTag={searchTag} searchUpdate={this.searchUpdate} searchTag={searchTag}/>
              </Route>
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/detail" component={Detail} />
              <Route path="/RecentOrder" component={RecentOrder} />
              <Route path="/RecentBooking" component={RecentBooking} />
              <Route path="/client">
                <Client lat={lat} lng={lng} photo={photo} description={description} restaurant={restaurant} address={address}/>
              </Route>
              <Route path="/new">
                <ClientOrder restaurantId="0" restaurantName="Horlicks"/>
              </Route>

            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

