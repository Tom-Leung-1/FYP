import React, {Component} from "react";
import {useGoogleMap, GoogleMap, LoadScript, DrawingManager, Marker } from "@react-google-maps/api"
import { faBus } from "@fortawesome/free-solid-svg-icons";
import config from "../../config/config.json"
import "./GoogleMap.css"
import test from "../../images/public_black_24dp.svg"
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
        const {setMarker, setMap, position, markersInfo} = this.props
        console.log({markersInfo})
        console.log("location", position)
        const markers = markersInfo.map(({lat, lng}) => {
            <Marker
                position ={position}
            />
        })
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
                        center= {position ? position : center}
                        zoom={14}
                    >
                        <DrawingManager
                            onMarkerComplete={setMarker}
                        />
                        <Marker
                            position ={position}
                        />
                        {markers}
                        {/*this image path is not based on the current directory. It is based on public for some reasons!!!!*/}
                        {/* <Marker
                            position ={{lat: 22.311680, lng: 114.168762}}
                            icon="images/restaurant.svg"
                        />  */}
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

export default Map