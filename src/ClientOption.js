import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


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
                    <h2 className="fw-normal mt-3"><strong>Home</strong></h2>
                    <hr/>
                    <section id="wellcome">
                        <h2>Hello, <span id="name"></span></h2>
                        <br/>
                        <p>What do you want to do?</p>
                        <div className="list-group">
                            <Link to="/" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Back to landing page and search restaurant</Link>
                            <Link to="/recentorder" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> See recent orders</Link>
                            <Link to="/recentbooking" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Check recent reservations</Link>
                            <Link to="/uprofile" className="list-group-item list-group-item-action border-0 bg-light" style={{display:"none"}}><i className="bi bi-arrow-right-circle"></i> Edit profile</Link>
                        </div>  
                    </section>
                </div>
            </div>
            </>
        )
    }
}


export default ClientOption
