import React, { Component } from "react";
import { useGoogleMap, GoogleMap, LoadScript, DrawingManager, Marker, InfoWindow } from "@react-google-maps/api"
import config from "../../config/config.json"
import "./GoogleMap.css"
import test from "../../images/public_black_24dp.svg"
const key = config["REACT_APP_GOOGLE_KEY"]

const containerStyle = {
    width: '100%',
    height: '100%',
};



class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markerIdx: -1,
            center: {
                lat: 22.311680,
                lng: 114.168762,
            }
        }
    }

    markerOnMouseOver = (markerIdx) => {
        this.setState({markerIdx})
    }

    handleCloseWindow = () => {
        this.setState({markerIdx : -1})
    }

    restaurantRedirection = (datum) => {
        this.props.selectRestaurant(datum)
        this.props.toRestaurantPage()
    }



    render() {
        const {selectRestaurant, setMarker, setMap, position, markersInfo, toRestaurantPage, firstCenter} = this.props
        const {markerIdx, center} = this.state
        console.log({center})
        console.log({ markersInfo })
        console.log("location", position)
        const markers = markersInfo?.map((datum, idx) => {
            const {lat, lng, restaurant, address} = datum
            return (
                <Marker
                key={idx} 
                position={{ lat, lng }}
                icon="images/dish.png"
                onMouseOver={() => this.markerOnMouseOver(idx)}
                onMouseOut={this.handleCloseWindow}
                onClick={() => this.restaurantRedirection(datum)}
                >
                    {markerIdx === idx && 
                        <InfoWindow 
                            poisiton={{lat, lng}}
                            onCloseClick={this.handleCloseWindow}
                        >
                                <div>
                                    {restaurant}
                                    <br/>
                                    {address}
                                </div>
                        </InfoWindow>}
                </Marker>
            )
        })
        /*this image path is not based on the current directory. It is based on public for some reasons!!!!*/
        return (
            <div className="map-wrapper">
                <LoadScript
                    googleMapsApiKey={key}
                    libraries={['drawing', 'places']}
                >
                    <GoogleMap
                        onLoad={setMap}
                        id="test"
                        mapContainerStyle={containerStyle}
                        center={
                            firstCenter ? firstCenter
                            :
                            position ? position : center
                        }
                        zoom={14}
                    >
                        {setMarker && 
                        <DrawingManager
                            onMarkerComplete={setMarker}
                        />}
                        <Marker
                            position={position}
                        />
                        {markers}
                        
                        
                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

export default Map