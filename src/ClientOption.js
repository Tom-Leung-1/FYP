import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
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
                            <div class="d-flex align-items-center p-1 panelOption">
                                <div class="flex-shrink">
                                    <DinnerDiningOutlinedIcon sx={{ fontSize: 60, color: "#6E5EFE" }} />
                                </div>
                                <div class="ms-2">
                                    See recent orders
                                </div>
                            </div>
                            </Link>

                            <Link to="/recentbooking" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-1 panelOption">
                                <div class="flex-shrink">
                                    <TableBarOutlinedIcon sx={{ fontSize: 60, color: "#6E5EFE" }} />
                                </div>
                                <div class="ms-2">
                                    Check recent reservations
                                </div>
                            </div>
                            </Link>

                            <Link to="/uprofile" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-1 panelOption">
                                <div class="flex-shrink">
                                    <ManageAccountsOutlinedIcon sx={{ fontSize: 60, color: "#6E5EFE" }} />
                                </div>
                                <div class="ms-2">
                                    Edit user profile
                                </div>
                            </div>
                            </Link>

                            <Link to="/" className='text-dark text-decoration-none col-md-4 col-lg-4 mb-3'>
                            <div class="d-flex align-items-center p-1 panelOption">
                                <div class="flex-shrink">
                                    <SearchOutlinedIcon sx={{ fontSize: 60, color: "#6E5EFE" }} />
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
