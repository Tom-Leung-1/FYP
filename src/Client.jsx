import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Client.css"
import Map from './components/GoogleMap/GoogleMap';
import axios from 'axios';
import Booking from './components/Booking/booking';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientLat: 22.33104,
            clientLng: 114.15977,
            restaurantInfo: [],
            restaurantName: "Horlicks",
            restaurantAddress : "Shop 888, 8/F, Dragon Centre, 37 Yen Chow Street, Sham Shui Po",
        };
    }

    setNameAdress = (restaurantName, restaurantAddress) => {
        this.setState({restaurantName, restaurantAddress})
    }
    
    render() {
        const {clientLat, clientLng, restaurantInfo, restaurantName, restaurantAddress} = this.state
        const position = {lat : clientLat, lng : clientLng} 
        console.log(position)
        return (
            <div className="bg-light">
                <div className="container px-5 py-5">    
                    <div className="card">
                        <img src="images/c_test.jpg" class="card-img-top" style={{width:"100%", height:"50vh", objectFit:"cover"}}/>
                            <div className="px-4 pt-2">
                                <p className="fs-3 fw-bold">{restaurantName}</p>
                                <p><i className="bi bi-star-fill" style={{color: "orange"}}></i> Restaurant with government license</p>
                                
                                <div className="d-grid gap-2 my-3">
                                  <Link to="/new" type="button" className="btn btn-primary rounded-pill border-0" style={{backgroundColor:"#6E5EFE"}}><b>Look at the Menu / Make order</b></Link>
                                </div>
                                <div className="card px-4 py-1 mb-5 shadow-sm">
                                    <Booking restaurantName={restaurantName}/>
                                </div>

                                <p>
                                    <span className="fw-bold"><i className="bi bi-clock"></i> Hours</span>
                                    <br/>
                                    <small className="text-muted">
                                    Tue-Sun: 5-11pm
                                    </small>
                                </p>

                                <p>
                                    <span className="fw-bold"><i className="bi bi-geo-alt-fill"></i> Location</span>
                                    <br/>
                                    <small className="text-muted">
                                    {restaurantAddress}
                                    </small>
                                </p>

                                <div className="pb-3">
                                <span className="fw-bold"><i className="bi bi-pin-map-fill"></i> Map</span>
                                <Map setNameAdress={this.setNameAdress}y position={position} markersInfo={restaurantInfo} lat={null} lng ={null}/>
                                </div>

                                <p className="pb-5">
                                    <span className="fw-bold">About</span>
                                    <br/>
                                    <small className="text-muted">
                                    Horlicks pays homage to the great traditions and savoir-faire of French gastronomy, redefining fine dining with a contemporary vision. It is a place where taste is the restaurant’s raison d’être and the ultimate criteria of success. The restaurant serves as one of the few places in the world to possess an unparalleled presence from the gastronomy pioneer.
                                    <br/>
                                    <br/>
                                    Horlicks sources produce from the best regions and harvested at their optimal time, highlighting a deep appreciation for nature and an intimate understanding of the seasons. Sourcing from small-scale farms and line-caught fish, the restaurant ensures unparalleled quality and a distinctive tasting experience.
                                    </small>
                                </p>
                                
                                
                            </div>
                            
                    </div>
                </div>
            </div>
        );
    }

    loadRestaurants = async () => {
        const res = await axios.get(`http://localhost:3001/getRestaurantJsons`)
        this.setState({restaurantInfo: res.data})
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
       // this.loadRestaurants() // geocoding is not precise enough
       console.log(location)
    }
}

export default Client;