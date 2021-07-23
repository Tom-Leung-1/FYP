import React, { Component } from 'react';
import "./Client.css"
import Map from './components/GoogleMap/GoogleMap';
class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientLat: null,
            clientLng: null,
        };
    }
    
    render() {
        const {clientLat, clientLng} = this.state
        const position = {lat : clientLat, lng : clientLng} 
        console.log(position)
        return (
            <div>
                <h1>Client</h1>
                <Map position={position}/>
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
    }
}

export default Client;