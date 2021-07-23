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
            lat: null,
            lng: null,
            key: 1
        };
    }
    
    render() {
        const {clientLat, clientLng, restaurantInfo, key} = this.state
        const position = {lat : clientLat, lng : clientLng} 
        console.log(position)
        return (
            <div>
                <h1>Client</h1>
                {restaurantInfo.length && <Map position={position} markersInfo={restaurantInfo} lat={null} lng ={null}/>}
            </div>
        );
    }

    loadRestaurants = async () => {
        const res = await axios.get(`http://localhost:3001/getRestaurantJsons`)
        this.setState({restaurantInfo: res.data, lat: 22.311680, lng: 114.168762, key: 2})

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
       this.loadRestaurants()
       console.log(location)
    }
}

export default Client;