import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const testOrderNo = 174574;

class DoneOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return (
            <>
            <div className="container p-3">
                <div className="d-flex flex-wrap justify-content-center fs-1">
                    You have finished to create an order!
                </div>
                <div className="d-flex flex-wrap justify-content-center fs-1">
                    Order No. :
                </div>
                <div className="d-flex flex-wrap justify-content-center display-1 fw-bolder">
                    {testOrderNo}
                </div>
                <div className="d-flex flex-wrap justify-content-center fs-5">
                    Please remenber this no. for checking the order.
                </div>
                <br/>
                <div className="d-flex flex-wrap justify-content-center">
                    <Link to="/new" type="button" className="btn btn-link text-decoration-none fs-4">Back to the menu page</Link>
                </div>

            </div>
            </>
        );
    }
}

export default DoneOrder;