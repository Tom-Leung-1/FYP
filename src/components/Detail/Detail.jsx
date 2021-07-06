import React, { Component } from 'react';
import "./Detail.css"
import FoodItemRow from './FoodItemRow';
import Table from '../Table/Table';
import GM from "../GoogleMap/GoogleMap"

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        const foodItems = [
            {food: "apple", remarks: "cool", price: "$5"},
            {food: "orange", remarks: "hot", price: "$5"},
            {food: "pine apple", remarks: "cool", price: "$5"},
        ]
        return (
            <>
                <Table headers={["food", "remarks","price"]} data={foodItems} needModify={false}/>
                <GM/>
            </>
        );
    }
}

export default Detail;