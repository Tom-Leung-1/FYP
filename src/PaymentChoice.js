import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaymentChoice extends Component {
    
    componentDidMount() {
        if (!window.location.hash) {
            window.location = window.location + '#choice';
            window.location.reload();
        }
     }   

    render() {
        return (
            <>
            <div className="container p-3">
                <div className="d-flex flex-wrap justify-content-center fs-2">
                    Please choose the method of payment:
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="card border-0 bg-light my-3">
                        <button type="button" className="btn btn-primary btn-lg fs-2 shadow border-0 mx-5" disabled style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                            <i className="bi bi-credit-card d-flex flex-wrap justify-content-center"></i>
                            Online Payment
                        </button>
                    </div>
                    <div className="card border-0 bg-light my-3" style={{width:"50vh"}}>
                        <Link to="/doneorder" type="button" className="btn btn-primary btn-lg fs-2 shadow border-0" style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                            <i className="bi bi-cash-coin d-flex flex-wrap justify-content-center mt-2"></i>
                            Cash
                        </Link>
                        <br/>
                        <p className="mx-3">
                        <i class="bi bi-square-fill"></i> Delivery
                        <br/>
                        pay to cashier/waiter in restaurant
                        <br/>
                        <br/>
                        <i class="bi bi-square-fill"></i> Take away
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