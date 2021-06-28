import React, {Component} from "react";
import {GoogleMap, LoadScript, DrawingManager, Marker } from "@react-google-maps/api"

import "./GoogleMap.css"

const key = process.env.REACT_APP_GOOGLE_KEY

const center = {
    lat: 22.311680,
    lng: 114.168762,
}

const containerStyle = {
    width: '100%',
    height: '100%',
};

const onMarkerComplete = marker => {
    const lat = marker.position.lat()
    const lng = marker.position.lng()
    console.log(lat)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

class Map extends Component {
    render() {
        return (
            <div className="map-wrapper">
                <LoadScript
                    googleMapsApiKey={key}
                    libraries={['drawing']}
                >
                    <GoogleMap
                        id="test"
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        <DrawingManager
                            onMarkerComplete={onMarkerComplete}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

export default Map