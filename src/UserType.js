import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserType extends Component {

    render() {
        return (
            <>
            <div className="container p-5 mt-5">
                <div className="d-flex flex-wrap justify-content-center fs-2">
                    Which kind of user you are?
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="card border-0 bg-light my-3">
                        <Link to="/ClientOption" type="button" className="btn btn-primary btn-lg fs-4 shadow border-0 mx-5" style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                            <i className="bi bi-person d-flex flex-wrap justify-content-center mt-3"></i>
                            Normal Customer
                        </Link>
                        <br/>
                        <p className="mx-5 d-flex fw-bold">
                            You can serach your favourite <br/>restaurant,
                            <br/>
                            make order or reservation through <br/>our website!
                        </p>
                    </div>
                    <div className="card border-0 bg-light my-3" style={{width:"50vh"}}>
                        <Link to="/register" type="button" className="btn btn-primary btn-lg fs-4 shadow border-0" style={{height: "18vh", width:"50vh", background: "#6E5EFE"}}>
                            <i className="bi bi-shop d-flex flex-wrap justify-content-center mt-3"></i>
                            Restaurant Owner
                        </Link>
                        <br/>
                        <p className="mx-3 d-flex fw-bold">
                            After you submit your information of your restaurant,
                            <br/>
                            You can use our website to mange the order and reservation of your restaurant!
                        </p>

                    </div>
                </div>

            </div>
            </>
        );
    }
}

export default UserType;