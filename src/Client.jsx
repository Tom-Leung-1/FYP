import React, { Component } from 'react';
import "./Client.css"
import Map from './components/GoogleMap/GoogleMap';
import axios from 'axios';
class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientLat: null,
            clientLng: null,
            restaurantInfo: [],
            restaurantName: "",
            restaurantAddress : "",
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
            <div>
                <h1>Client</h1>
                <div>
                    <p>restaurant with government license</p>
                    <p>Name: {restaurantName}</p>
                    <p>Address: {restaurantAddress}</p>
                </div>
                <Map setNameAdress={this.setNameAdress} position={position} markersInfo={restaurantInfo} lat={null} lng ={null}/>
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