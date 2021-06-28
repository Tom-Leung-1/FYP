import React, {Component} from "react";
import {useGoogleMap, GoogleMap, LoadScript, DrawingManager, Marker } from "@react-google-maps/api"
import config from "../../config/config.json"
import "./GoogleMap.css"

const key = config["REACT_APP_GOOGLE_KEY"]

const center = {
    lat: 22.311680,
    lng: 114.168762,
}

const containerStyle = {
    width: '100%',
    height: '100%',
};



class Map extends Component {
    constructor(props) {
        super(props) 
        this.state = {

        }
    }
    render() {
        const {setMarker, setMap} = this.props
        return (
            <div className="map-wrapper">
                <LoadScript
                    googleMapsApiKey={key}
                    libraries={['drawing']}
                >
                    <GoogleMap
                        onLoad={setMap}
                        id="test"
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        <DrawingManager
                            onMarkerComplete={setMarker}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

export default Map