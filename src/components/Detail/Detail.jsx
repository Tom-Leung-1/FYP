import React, { Component } from 'react';
import "./Detail.css"
import FoodItemRow from './FoodItemRow';
import Table from '../Table/Table';
import GM from "../GoogleMap/GoogleMap"
import config from '../../config/config.json';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {},
            ownerAddress : {lat: 22.415591733990457, lng: 114.2076472692653},
        };
    }

    addressToLatLng = async (address) => {
        const key = config["REACT_APP_GOOGLE_KEY"]
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
        const data = await response.json()
        return (data.results[0].geometry.location)
    }

    //doesn't work in frontend, change it to backend code
    getExpectTime = async (origin, destination) => {
        const key = config["REACT_APP_GOOGLE_KEY"]
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${key}`)
        const data = await response.json()
        console.log(data)
    }
    
    render() {
        const {position} = this.state
        const foodItems = [
            {food: "apple", remarks: "cool", price: "$5"},
            {food: "orange", remarks: "hot", price: "$5"},
            {food: "pine apple", remarks: "cool", price: "$5"},
        ]
        const address = "香港中文大學崇基學院"
        return (
            <>
                <Table headers={["food", "remarks","price"]} data={foodItems} needModify={false}/>
                <GM position={position}/>
            </>
        );
    }

    async componentDidMount() {
        const {ownerAddress} = this.state
        const position = await this.addressToLatLng("香港中文大學崇基學院")
        const expectedTime = this.getExpectTime(ownerAddress, position)
        this.setState({position})
    }
}

export default Detail;