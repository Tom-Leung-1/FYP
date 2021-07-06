import React, { Component } from 'react';
import "./Order.css"
import Table from "./components/Table/Table"
import Detail from "./components/Detail/Detail"

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return (
            <div className="order-detail-wrapper">
                <div className="order-wrapper">
                    <div className="table-container">
                        <Table headers={["Order ID", "Name", "Time", "Type", "Status",  "View Details"]} needModify={true}/>
                    </div>
                </div>
                <div className="detail-wrapper">
                    <Detail/>
                </div>
            </div>
        );
    }
}

export default Order;