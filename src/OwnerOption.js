import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { ReactComponent as DesignMenuIcon } from './images/menu.svg';
import { ReactComponent as ReceivedOrderIcon } from './images/received.svg';
import { ReactComponent as TableRestaurantIcon } from './images/owner_table.svg';
import { ReactComponent as OpenIcon } from './images/open.svg';
import { ReactComponent as RestaurantIcon } from './images/restaurant_pro.svg';


class OwnerOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }

    render() {
        return (
            <>
            <div className="">
                <div className="container p-2" style={{width: '100%'}}>
                    <h2 className="fw-normal mt-3"><strong>Restaurant Owner Panel</strong></h2>
                    <hr/>
                    <section id="wellcome">
                        <h2>Hello! <span id="name"></span></h2>
                        <br/>
                        <h5>Here is the panel for restaurant owner, What do you want to do?</h5>
                        <div className='row justify-content-left py-2'>

                            <Link to="/menu" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <DesignMenuIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Design menu
                                </div>
                            </div>
                            </Link>

                            <Link to="/orderlist" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <ReceivedOrderIcon style={{height:"60px", width:"60px"}}/>
                                </div>
                                <div class="ms-2">
                                    See received orders
                                </div>
                            </div>
                            </Link>

                            <Link to="/booking" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <TableRestaurantIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Manage table reservation
                                </div>
                            </div>
                            </Link>

                            <Link to="/bookSetting" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <OpenIcon style={{height:"60px", width:"60px"}}/>
                                </div>
                                <div class="ms-2">
                                    Set opening time/table reservation items
                                </div>
                            </div>
                            </Link>

                            <Link to="/rprofile" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <RestaurantIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Check restaurant's profile
                                </div>
                            </div>
                            </Link>                           

                        </div>
                    </section>
                </div>
            </div>
            </>
        )
    }
}


export default OwnerOption

/*
                        <div class="d-flex justify-content-center">
                            <Link to="/orderlist" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> See received orders</Link>
                            <Link to="/orderlist" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> See received orders</Link>
                            <Link to="/booking" className="list-group-item list-group-item-action border-0 bg-light fst-italic"><i className="bi bi-arrow-right-circle"></i> Manage table reservation</Link>
                            <Link to="/bookSetting" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Set opening time/table reservation items</Link>
                            <Link to="/rprofile" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Check restaurant's profile</Link>

                        </div>
                        <div className="list-group">
                    
                        </div>  
*/
