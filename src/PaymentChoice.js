import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

class PaymentChoice extends Component {

    render() {
        const {sendOrder, userId} = this.props
        
        return (
            <>
                <div className="container p-3">
                    <div className="d-flex flex-wrap justify-content-center fs-2">
                        Please choose the method of payment:
                    </div>
                    <div className="d-flex flex-wrap justify-content-center my-1">
                      <Alert severity="info">
                        You can choose to pay by cash only after you log in your account of Foodcreek
                      </Alert>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        <div className="card border-0 bg-light my-3">
                            <button type="button" className="btn btn-primary btn-lg fs-2 shadow border-0 mx-5" disabled style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                                <i className="bi bi-credit-card d-flex flex-wrap justify-content-center"></i>
                                Online Payment
                            </button>
                        </div>
                        <div className="card border-0 bg-light my-3">
                            <button type="button" className="btn btn-primary btn-lg fs-2 shadow border-0 mx-5" disabled style={{height: "18vh", width:"50vh", background: "#6E5EFE", display: userId < 0 ? "block":"none"}}>
                                <i className="bi bi-cash-coin d-flex flex-wrap justify-content-center"></i>
                                Cash
                            </button>
                            <Link onClick={sendOrder} to={"/doneorder"} style={{display: userId < 0 ? "none":"block"}}>
                            <button type="button" className="btn btn-primary btn-lg fs-2 shadow border-0 mx-5" style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                                <i className="bi bi-cash-coin d-flex flex-wrap justify-content-center"></i>
                                Cash
                            </button>
                            </Link>
                            <br/>
                            <p className="mx-5">
                            <i class="bi bi-square-fill fa-xs"></i> Delivery
                            <br/>
                            pay to cashier/waiter in restaurant
                            <br/>
                            <br/>
                            <i class="bi bi-square-fill fa-xs"></i> Take away
                            <br/>
                            pay to courier
                            </p>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default PaymentChoice;
