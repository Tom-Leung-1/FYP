import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


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
                        <div className="list-group">
                            <Link to="/menu" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Design menu</Link>
                            <Link to="/orderlist" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> See received orders</Link>
                            <Link to="/booking" className="list-group-item list-group-item-action border-0 bg-light fst-italic" style={{pointerEvents: "none"}}><i className="bi bi-arrow-right-circle"></i> Manage table reservation (Coming soon)</Link>
                            <Link to="/bookSetting" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Set reservation time slot</Link>
                            <Link to="/rprofile" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Check restaurant's profile</Link>
                        </div>  
                    </section>
                </div>
            </div>
            </>
        )
    }
}


export default OwnerOption
