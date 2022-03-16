import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { ReactComponent as OrderIcon } from './images/orderlist.svg';
import { ReactComponent as TableClientIcon } from './images/client_table.svg';
import { ReactComponent as UserIcon } from './images/user_pro.svg';
import { ReactComponent as SearchIcon } from './images/search.svg';

import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


class ClientOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }

    render() {
        return (
            <>
            <div className="">
                <div className="container p-2" style={{width: '100%'}}>
                    <h2 className="fw-normal mt-3"><strong>Normal Customer Panel</strong></h2>
                    <hr/>
                    <section id="wellcome">
                        <h2>Hello! <span id="name"></span></h2>
                        <br/>
                        <h5>Here is the panel for normal customer, What do you want to do?</h5>

                        <div className='row justify-content-left py-2'>

                            <Link to="/recentorder" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <OrderIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    See recent orders
                                </div>
                            </div>
                            </Link>

                            <Link to="/recentbooking" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <TableClientIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Check recent reservations
                                </div>
                            </div>
                            </Link>

                            <Link to="/uprofile" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <UserIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Edit user profile
                                </div>
                            </div>
                            </Link>

                            <Link to="/" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-2 panelOption">
                                <div class="flex-shrink">
                                    <SearchIcon style={{height:"60px", width:"60px"}} />
                                </div>
                                <div class="ms-2">
                                    Back to the home page and search restaurant
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


export default ClientOption
