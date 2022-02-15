import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class UProfile extends Component {
    
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

              <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                  <Link to="/ClientOption" className="breadcrumb-item text-decoration-none">Normal Customer</Link>
                  <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                </ol>
              </nav>

              <h2 className="fw-normal"><strong>User Profile</strong></h2>
              <hr className="mb-4" />

              <table class="table table-hover">
              <tr>
              <th>Username</th>
              <td id="uname">WhoAmI</td>
              </tr>
              <tr>
              <th>Email Address</th>
              <td id="uemail">abc@example.com</td>
              </tr>
              <tr>
              <th>Phone No.</th>
              <td id="uphone">22223333</td>
              </tr>
              <tr>
              <th>Address</th>
              <td id="uaddress">3248 Round Table Drive, ABC, EFG</td>
              </tr>
              </table>

              <Link to="./UProfileSetting" type="button" className="btn btn-sm btn-primary mr-2" style={{backgroundColor:"#6E5EFE"}}>Update Profile</Link>
              <Link to="./UpdatePwd" type="button" className="btn btn-sm btn-primary m-2" style={{backgroundColor:"#6E5EFE"}}>Change Password</Link>
              
            </div>

            </>


            
            
        );
    }
}
export default UProfile;
