import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TextInput from "./components/Inputs/TextInput"

var CryptoJS = require("crypto-js");

class ResetPwd extends Component {
    
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
      const validPass = /^(?=.*[A-Z]).{8,16}$/;
      if (value === "") {
        this.setState({confirmPassError: 'Please enter your password again for confirmation.'});
         return
      }
      if (value != document.getElementById("newPass").value) {
        this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
         return
      }
      else if (!(value.match(validPass))) {
        this.setState({confirmPassError: 'Your password is not available.'});
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
            <div id="test" className="d-flex justify-content-center p-5">
                  <form onSubmit={this.submitForm} className="shadow-sm" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <h2 className="text-center mb-4 fw-normal"><strong>Reset Password</strong></h2>
                    <Alert severity="info">
                      In order to protect your account, please make sure your new password:
                      <li>Is between 8 to 16 characters</li>
                      <li>Contains at least one uppercase letter</li>
                      <li>Is different to previous used passwords</li>
                    </Alert>
                      <div className='mb-5'>
                      <label for="password" class="col-form-label"><strong><small>New Password</small></strong></label>
                      <input type="password" id="newPass" className={`${passwordError === "OK" ? "is-valid" : passwordError ? "is-invalid" : ""} form-control form-control-sm mb-1`} onChange={this.handleOnChange} required />
                      {passwordError && <div className="invalid-feedback">{passwordError}</div>}

                      <label for="email" class="col-form-label"><strong><small>Confirm New Password</small></strong></label>
                      <input type="password" id="confirmPass" className={`${confirmPassError === "OK" ? "is-valid" : confirmPassError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} onChange={this.handleOnChange} required />
                      {confirmPassError && <div className="invalid-feedback">{confirmPassError}</div>}
                      </div>

                    

                    <div className="d-grid gap-2 mt-2">
                      <Link to="/sign-in" type="button" className="shadow-sm btn btn-outline-primary rounded-pill border-2" onClick={""}><b>Reset Password</b></Link>
                    </div>
                  </form>
                </div>

            </>


            
            
        );
    }
}
export default ResetPwd;

