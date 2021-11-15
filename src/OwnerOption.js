import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import { Helmet } from "react-helmet";


const data = [

];

class OwnerOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }

	handleMouse(index) {
        if (this.state.selected != index)
			this.setState({selected: index});
		else
			this.setState({selected: -1});
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
                            <a href="./profile.html" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Check restaurant's profile</a>
                            <Link to="/menu" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Design menu</Link>
                            <a href="#" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> See received orders</a>
                            <a href="#" className="list-group-item list-group-item-action border-0 bg-light"><i className="bi bi-arrow-right-circle"></i> Manage table reservation</a>
                        </div>  
                    </section>
                </div>
            </div>
            </>
        )
    }
}


export default OwnerOption
