import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

var CryptoJS = require("crypto-js");

class UpdatePwd extends Component {
    
    constructor(props) {
        super(props);
        this.state = { password: '',
                       passwordError: '',
                       confirmPassError: '',
                       showPass: false 
                     };
    }

    handleOnChange = (e) => {
      const {id} = e.currentTarget
      if (id === "newPass")
        this.checkPassword(e)
      else if (id === "confirmPass")
        this.confirmPassword(e)
    }

    checkPassword (e) {
      const value = e.target.value;
      const validPass = /^(?=.*[A-Z]).{8,16}$/;
      if (value === "") {
        this.setState({passwordError: 'Password cannot be empty.'});
        return
      }
      if (!(value.match(validPass))) {
        this.setState({passwordError: 'Your new password should be between 8 to 16 characters, which contain at least one uppercase letter.'});
        return
      }
      this.setState({passwordError: 'OK'});
      this.setState({password: CryptoJS.MD5(value).toString()});
    }

  confirmPassword (e) {
      const value = e.target.value;
      if (value === "") {
        this.setState({confirmPassError: 'Please enter your password again for confirmation.'});
         return
      }
      if (value != document.getElementById("newPass").value) {
        this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
         return
      }
      this.setState({confirmPassError: 'OK'});
    }

    showPass = () => {
      const {showPass} = this.state
      this.setState({showPass: !showPass});
    }

    render() {
        const {passwordError, confirmPassError} = this.state
        return (
            <>
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>

            <div id="" className="container p-3">
            <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                  <Link to="/ClientOption" className="breadcrumb-item text-decoration-none">Normal Customer</Link>
                  <Link to="/uprofile" className="breadcrumb-item text-decoration-none">User Profile</Link>
                  <li className="breadcrumb-item active" aria-current="page">Change Password</li>
                </ol>
              </nav>

            <h2 className="fw-normal"><strong>Change Password</strong></h2>
            <hr className="mb-4" />

            <Alert severity="info">
              In order to protect your account, please make sure your new password:
                <li>Is between 8 to 16 characters</li>
                <li>Contains at least one uppercase letter</li>
            </Alert>

            <br/>

            <form id="newform">
            <div class="mb-3 row">
                <label for="username" class="col-lg-3 col-sm-4 col-form-label">New Password: </label>
                <div class="col-lg-3 col-sm-4">
                  <input type="password" id="newPass" className={`${passwordError === "OK" ? "is-valid" : passwordError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} onChange={this.handleOnChange} required />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
            </div>
            <div class="mb-3 row">
                <label for="email" class="col-lg-3 col-sm-4 col-form-label">Confirm New Password: </label>
                <div class="col-lg-3 col-sm-4">
                  <input type="password" id="confirmPass" className={`${confirmPassError === "OK" ? "is-valid" : confirmPassError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} onChange={this.handleOnChange} required />
                  {confirmPassError && <div className="invalid-feedback">{confirmPassError}</div>}
                </div>
            </div>

            <div class="d-grid gap-2 col-2 mx-auto">
              <button type="submit" class="btn btn-sm btn-primary" style={{backgroundColor:"#6E5EFE"}}>Change Password</button>
            </div>
            </form>
            </div>

            </>


            
            
        );
    }
}
export default UpdatePwd;

