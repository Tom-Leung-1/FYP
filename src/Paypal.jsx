import { flexbox } from '@mui/system';
import { queryHelpers } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ReactComponent as OKIcon } from './images/ok.svg';

class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payed : false,
        };
    }

    componentDidMount = () => {
        const {clientTotal} = this.props;
        window.paypal.Buttons({
            style: {
                label:  'checkout'
            },
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: "Food order",
                            amount: {
                                currency_code: "HKD",
                                value: clientTotal,
                            }
                        }
                    ]
                })
            },
            onApprove: (data, actions) => {
                return actions.order.capture()
                .then(async details => {
                    //alert("Order paid!")
                    this.props.sendOrder()
                    this.props.orderReset()
                    this.setState({payed : true})
                })
            },
            onError: (err) => {
                console.log(err)
            }
        }).render('#paypal-button-container')
    }
    
    render() {
        const {payed} = this.state
        const {clientOrder} = this.props
        return (
            <>
                {
                    payed  
                    ?
                        <>
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
                        </div>
                        </>
                    :
                        clientOrder.length
                        ?
                        <>
                        <div className='container p-5 text-center'>
                           <h2 >Please choose the online payment method:</h2> 
                           <br/>
                           <div id="paypal-button-container" style={{"display": "flex", "justify-content" : "center"}}/>

                        </div>
                        </>
                        :
                        <div className='container p-5'>
                          <Alert severity="error" className='mt-5'>
                            <AlertTitle><b>Error</b></AlertTitle>
                              No order is created for payment. Please go the menu page of the restaurant and create the order.
                              <br/>
                              <Link to="/home" className='text-decoration-none'>&#8592;Back to home page</Link>
                          </Alert>
                        </div>
                }
            </>
        );
    }
}

export default Paypal;