import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const {owner} = this.props
        return (
            <>
            <Helmet>
              <title>User type</title>
            </Helmet>
            <div className="container mt-5">
                <div className="d-flex flex-wrap justify-content-center fs-2">
                    Which kind of users are you?
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="card border-0 bg-light my-3">
                        <Link to="/ClientOption">
                            <button type="button" className="enlargeBtn btn btn-primary btn-lg fs-4 shadow border-0" style={{height: "120px", width:"290px", background: "#6E5EFE"}}>
                            <i className="bi bi-person d-flex flex-wrap justify-content-center"></i>
                            Normal Customer
                            </button>
                        </Link>
                        <br/>
                        <p className="mx-3 d-flex fw-bold" style={{width: "290px"}}>
                            You can search for your favourite restaurants,
                            make orders or reservations on our website!
                        </p>
                    </div>
                    <div className="card border-0 bg-light my-3">
                        <Link to={owner ? "/OwnerOption" : "/register"}>
                            <button type="button" className="enlargeBtn btn btn-primary btn-lg fs-4 shadow border-0" style={{height: "120px", width:"290px", background: "#6E5EFE"}}>
                            <i className="bi bi-shop d-flex flex-wrap justify-content-center"></i>
                            Restaurant Owner
                            </button>
                        </Link>
                        <br/>
                        <p className="mx-3 d-flex fw-bold" style={{width: "290px"}}>
                            After you submit your information about your restaurant,
                            <br/>
                            You can use our website to manage orders and reservations of your restaurant!
                        </p>
                    </div>
                </div>

            </div>
            </>
        );
    }
}

export default UserType;