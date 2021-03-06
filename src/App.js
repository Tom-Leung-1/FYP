import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar/NewNavbar";
import LoginNavbar from "./components/Navbar/LoginNavbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import BRegister from "./BRegister";
import Searching from "./Searching";
import MealMenu from "./mealMenu";
import BookingStatus from "./BookingStatus";
import BookingSetting from "./BookingSetting";
import Order from "./Order";
import OrderList from "./OrderList";
import Client from './Client';
import ClientOrder from './ClientOrder';
import PaymentChoice from './PaymentChoice';
import DoneOrder from './DoneOrder';
import OwnerOption from './OwnerOption';
import RProfile from './RProfile';
import RecentOrder from './RecentOrder';
import RecentBooking from './RecentBooking';
import ClientOption from './ClientOption';
import UProfile from './UProfile';
import RProfileSetting from './RProfileSetting';
import UProfileSetting from './UProfileSetting';
import UpdatePwd from './UpdatePwd';
import ResetPwd from './ResetPwd';
import ForgotPwd from './ForgotPwd';
import ForgotMail from './ForgotMail';
import UserType from './UserType';
import Paypal from "./Paypal";
import Activate from "./Activate";
import ActivateMail from "./activateMail";
import RestaurantList from './RestaurantList';
import BRstate from './BRstate';
import axios from "axios"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(sessionStorage.getItem('appState')) || {
      searchTag : "",
      lat : -1,
      lng : -1,
      orderLat : -1,
      orderLng : -1,
      orderPhone : "",
      orderAddress : "",
      photo : "",
      description : "",
      restaurant: "",
      address: "",
      userId: -1,
      owner: 0,
      clientOrder: [],
      clientTotal: 0,
      clientTakeaway: false,
      clientRestaurantId: -1,
      ownerRestaurantId : -1,
      openHours: "",
    };
  } 

  orderReset = () => {
    this.setState({
      clientOrder: [],
      clientTotal: 0,
      clientTakeaway: false,
    })
  }

  setRestaurantId = (ownerRestaurantId) => {
    this.setState({ownerRestaurantId})
  }
  
  
  searchUpdate = (searchTag) => {
    console.log(searchTag)
    this.setState({searchTag})
  }

  selectRestaurant = (datum) => {
    const {lat, lng, photo, restaurant, address, description, id} = datum
    this.setState({lat, lng, photo, restaurant, address, description, clientRestaurantId : id, openHours : datum['open_hours']})
  }

  signInSetting = (datum) => {
    const {id, owner, restaurantId} = datum
    this.setState({userId : id, owner, ownerRestaurantId : restaurantId || -1})
  }

  saveOrder = (clientOrder, clientTotal, clientTakeaway, orderLat, orderLng, orderPhone, orderAddress) => {
    this.setState({clientOrder, clientTotal, clientTakeaway, orderLat, orderLng, orderPhone, orderAddress})
  }

  sendOrder = async () => {
    const {userId, restaurant, clientOrder, clientTotal, clientTakeaway, clientRestaurantId, orderLat, orderLng, orderPhone, orderAddress} = this.state
    let orderId
    await axios.post(`http://localhost:3001/sendOrder`, {clientOrder, clientTotal, clientTakeaway, clientRestaurantId, })
    .then(response => {
      orderId = response.data
    })
    .catch(error => {
      console.log(error)
      return
    })
    await axios.post(`http://localhost:3001/userOrder`, {userId, orderId, restaurant, clientTakeaway, clientTotal, orderLat, orderLng, orderPhone, orderAddress})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    console.log("order sent!!!")
  }

  signOut = (num) => {
    this.setState({userId: -1})
  }

  updateSession = () => {
    sessionStorage.setItem('appState', JSON.stringify(this.state))
  }

  render() {
    const {clientOrder, clientTotal, openHours, userId, ownerRestaurantId, clientRestaurantId, owner, searchTag, lat, lng, photo, description, restaurant, address} = this.state
    this.updateSession()
    return (
      <Router>
        <div className="App">
          <Helmet>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.1/font/bootstrap-icons.css"></link>
          </Helmet>
          <Switch>
            <div className="page">
              {userId < 0 ? <Navbar /> : <LoginNavbar signOut={this.signOut}/>}
              <Route path="/" exact>
                <Home selectRestaurant={this.selectRestaurant} searchUpdate={this.searchUpdate}/>
              </Route>
              <Route path="/home">
                <Home selectRestaurant={this.selectRestaurant} searchUpdate={this.searchUpdate}/>
              </Route>
              <Route path="/search">
                <Searching selectRestaurant={this.selectRestaurant} searchTag={searchTag} searchUpdate={this.searchUpdate} />
              </Route>
              <Route path="/sign-in">
                <Login signInSetting={this.signInSetting}/> 
              </Route>
              <Route path="/forgot">
                <ForgotPwd/> 
              </Route>
              <Route path="/send" component={ForgotMail} />
              <Route path="/reset" component={ResetPwd} />
              <Route path="/sign-up">
                <SignUp signInSetting={this.signInSetting}/>
              </Route>
              <Route path="/RecentOrder">
                 <RecentOrder userId={userId}/>
              </Route>
              <Route path="/RecentBooking">
                <RecentBooking userId={userId}/>
              </Route>
              <Route path="/client">
                <Client clientRestaurantId={clientRestaurantId} userId={userId} lat={lat} lng={lng} photo={photo} description={description} restaurant={restaurant} address={address} openHours={openHours}/>
              </Route>
              <Route path="/new">
                <ClientOrder userId={userId} saveOrder={this.saveOrder} restaurantId={clientRestaurantId} restaurantName={restaurant}/>
              </Route>
              <Route path="/menu">
                <MealMenu restaurantId={ownerRestaurantId}/>
              </Route>
              <Route path="/booking">
                <BookingStatus restaurantId={ownerRestaurantId}/>
              </Route>
              <Route path="/booksetting">
                <BookingSetting restaurantId={ownerRestaurantId}/>
              </Route>
              <Route path="/register">
                <BRegister setRestaurantId={this.setRestaurantId} userId={userId}/>
              </Route>
              <Route path="/pay">
                <PaymentChoice userId={userId} sendOrder={this.sendOrder}/>
              </Route>
              <Route path="/doneOrder">
                <DoneOrder userId={userId}/>
              </Route>
              <Route path="/OwnerOption">
                <OwnerOption/>
              </Route>
              <Route path="/rprofile">
                <RProfile ownerRestaurantId={ownerRestaurantId}/>
              </Route>
              <Route path="/RProfileSetting">
              <RProfileSetting restaurantId={ownerRestaurantId}/>
              </Route> 
              <Route path="/orderlist">
                <OrderList restaurantId={ownerRestaurantId}/>
              </Route>
              <Route path="/ClientOption" component={ClientOption}/>
              <Route path="/uprofile">
                <UProfile userId={userId}/>
              </Route>
              <Route path="/UprofileSetting">
                <UProfileSetting userId={userId}/>
              </Route>
              <Route path="/UpdatePwd" component={UpdatePwd}/>
              <Route path="/UserType">
                <UserType owner={owner}/>
              </Route>
              <Route path="/activateMail">
                <ActivateMail/>
              </Route>
              <Route path="/activate">
                <Activate/>
              </Route>
              <Route path="/paypal">
                <Paypal userId={userId} clientOrder={clientOrder} orderReset={this.orderReset} sendOrder={this.sendOrder} clientTotal={clientTotal}/>
              </Route>
              <Route path="/Rlist">
                <RestaurantList/>
              </Route>
              <Route path="/brState">
                <BRstate/>
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

