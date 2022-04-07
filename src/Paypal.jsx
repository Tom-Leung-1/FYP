import { flexbox } from '@mui/system';
import { queryHelpers } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    alert("Order paid!")
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
                            <Link to={"/ClientOption"}>
                                <button>Back to the Normal Customer Panel</button>
                            </Link>
                            <Link to={"/new"}>
                                <button>Back to the main menu</button>
                            </Link>
                        </>
                    :
                        clientOrder.length
                        ?
                            <div id="paypal-button-container" style={{"display": "flex", "justify-content" : "center"}}/>
                        :
                            <div> No </div>
                }
            </>
        );
    }
}

export default Paypal;