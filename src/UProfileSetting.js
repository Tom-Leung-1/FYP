import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class UProfileSetting extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
                       
                     };
    }

    render() {
        return (
            <>
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>

            <div id="" className="container p-3">
            
            <h2 className="fw-normal"><strong>Update User Profile</strong></h2>
            <hr className="mb-4" />

            <form id="newform">
                <label for="username" class="mb-3">New userame:</label>
                <input id="username" class="form-control mb-3" placeholder="Name" required />
                <label for="email" class="mb-3">New Email Address:</label>
                <input type="email" id="email" class="form-control mb-3" placeholder="Email Address" required />
                <button type="submit" class="btn btn-primary" style={{float: "right", backgroundColor:"#6E5EFE"}}>Save</button>
            </form>
            <Link to="/uprofile" type="button" class="btn btn-secondary">Back</Link>

              
            </div>

            </>


            
            
        );
    }
}
export default UProfileSetting;
