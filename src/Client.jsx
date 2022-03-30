import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Client.css"
import Map from './components/GoogleMap/GoogleMap';
import axios from 'axios';
import Booking from './components/Booking/booking';
import { Helmet } from "react-helmet";

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientLat: 22.33104,
            clientLng: 114.15977,
        };
    }
    
    render() {
        const {clientRestaurantId, userId, lat, lng, photo, description, restaurant, address, openHours} = this.props
        const position = {lat, lng} 
        return (
            <div className="bg-light">
                <Helmet>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                <title>{restaurant}</title>
                </Helmet>
                <div className="container px-5 py-5">    
                    <div className="card">
                        <img src={`images/restaurants/${photo || "default.png"}`} class="card-img-top" style={{width:"100%", height:"50vh", objectFit:"cover"}}/>
                            <div className="px-4 pt-2">
                                <p className="fs-3 fw-bold">{restaurant}</p>
                                <p><i className="bi bi-star-fill" style={{color: "orange"}}></i> Restaurant with government license</p>
                                
                                <div className="card px-4 py-1 mb-5 shadow-sm">
                                    <Booking clientRestaurantId={clientRestaurantId} openHours={openHours} userId={userId} restaurantName={restaurant}/>
                                </div>

                                <p>
                                    <span className="fw-bold"><i className="bi bi-clock"></i> Hours</span>
                                    <br/>
                                    <small className="text-muted">
                                    {openHours}
                                    </small>
                                </p>

                                <p>
                                    <span className="fw-bold"><i className="bi bi-geo-alt-fill"></i> Location</span>
                                    <br/>
                                    <small className="text-muted">
                                    {address}
                                    </small>
                                </p>

                                <div className="pb-3">
                                    <span className="fw-bold"><i className="bi bi-pin-map-fill"></i> Map</span>
                                    <Map position={position}/>
                                </div>

                                <div className="pb-3">
                                <span className="fw-bold"> Menu</span>
                                <div className="d-grid gap-2">
                                  <Link to="/new" type="button" className="btn btn-primary rounded-pill border-0" style={{backgroundColor:"#6E5EFE"}}><b>Look at the Menu / Make order</b></Link>
                                </div>
                                </div>

                                <p className="pb-5">
                                    <span className="fw-bold">About</span>
                                    <br/>
                                    <small className="text-muted">
                                    {description}
                                    </small>
                                </p>
                            </div>
                            
                    </div>
                </div>
            </div>
        );
    }

    locationSuccess = (pos) => {
        const {latitude, longitude} = pos.coords
        console.log({latitude, longitude})
        this.setState({clientLat:latitude, clientLng:longitude})
    }

    locationError = (err) => {
        console.log({err})
    }

    componentDidMount() {
       const location = navigator.geolocation
       location.getCurrentPosition(this.locationSuccess, this.locationError)
       console.log(location)
       window.scrollTo(0, 0)
    }
}

export default Client;