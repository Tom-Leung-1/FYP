import React, { Component } from 'react';
import "./Detail.css"
import FoodItemRow from './FoodItemRow';
import Table from '../Table/Table';
import GM from "../GoogleMap/GoogleMap"
import config from '../../config/config.json';
import axios from "axios"

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
        const res = await axios.get(`http://localhost:3001/expectedTime?origin=${JSON.stringify(origin)}&destination=${JSON.stringify(destination)}&key=${key}`)
        const {distance, duration} = (res.data.rows[0].elements[0])
        return {distance, duration}
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
        const {distance, duration} = await this.getExpectTime(ownerAddress, position)
        console.log("hello", {distance, duration})
        this.setState({position})
    }
}

export default Detail;