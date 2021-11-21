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

              <h2 className="fw-normal"><strong>User Profile</strong></h2>
              <hr className="mb-4" />

              <Link to="./UProfileSetting" type="button" className="btn btn-primary mb-2" style={{backgroundColor:"#6E5EFE"}}>Update Profile</Link>

              <table class="table table-hover">
              <tr>
              <th>UserName</th>
              <td id="uname">WhoAmI</td>
              </tr>
              <tr>
              <th>Email Address</th>
              <td id="uemail">abc@example.com</td>
              </tr>
              </table>

              
            </div>

            </>


            
            
        );
    }
}
export default UProfile;
