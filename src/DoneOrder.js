import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { ReactComponent as OKIcon } from './images/ok.svg';

const testOrderNo = 174574;

class DoneOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        const {userId} = this.props
        return (
            <>
            <Helmet>
                <title>Finish order!</title>
            </Helmet>
            <div className="container p-3">
                <div className="d-flex flex-wrap justify-content-center fs-1 mt-5">
                  <OKIcon style={{height:"200px", width:"200px"}}/>
                </div>
                <div className="d-flex flex-wrap justify-content-center fs-1">
                    You have finished to create an order!
                </div>
                <br/>
                <div className="d-flex flex-wrap justify-content-center">
                    <Link to="/new" type="button" className="btn btn-link text-decoration-none fs-4">Back to the menu page</Link>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <Link to="/recentorder" type="button" className="btn btn-link text-decoration-none fs-4" style={{display: userId > 0 ? "inline" : "none"}}>See recent order</Link>
                </div>

            </div>
            </>
        );
    }
}

export default DoneOrder;

/*
<div className="d-flex flex-wrap justify-content-center display-1 fw-bolder">
                    {testOrderNo}
                </div>
                <div className="d-flex flex-wrap justify-content-center fs-5">
                    Please remenber this no. for checking the order.
                </div>
*/