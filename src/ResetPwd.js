import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextInput from "./components/Inputs/TextInput"
import axios from 'axios';

var CryptoJS = require("crypto-js");

class ResetPwd extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        id : -1,
        valid : false,
        token : "",
        password: '',
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
      this.setState({passwordError: 'Your new password should be between 8 to 16 characters and contains at least one uppercase letter.'});
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
      this.setState({confirmPassError: 'Your password does not match.'});
      return
    }
    else if (!(value.match(validPass))) {
      this.setState({confirmPassError: 'Your new password should be between 8 to 16 characters and contains at least one uppercase letter.'});
      return
    }
    this.setState({confirmPassError: 'OK'});
  }

  submitPassword = async (e) => {
    e.preventDefault()
    const {id, password, passwordError, confirmPassError} = this.state
    if (passwordError + confirmPassError !== "OKOK") {
      alert("Please make sure that your password meet the conditions stated in the information box.")
      return 
    }
    await axios.post(`http://localhost:3001/submitPassword`, {id, password})
    .then(response => {
      console.log(response.data)
      alert("Your password has been changed successfully!")
      document.querySelector("#toSignInPage").click()
      return
    })
    .catch(error => {
      alert(error)
      return
    })
  }

  showPass = () => {
    const {showPass} = this.state
    this.setState({showPass: !showPass});
  }

  checkValid = async (token) => {
    await axios.get(`http://localhost:3001/resetCheck?token=${token}`)
      .then(response => {
        console.log(response)
        if (response.data.length) {
          const {expire, id} = response.data[0]
          const dateTime = new Date(expire);
          const now = new Date(Date.now() - 8 * 3600000) // for some reasons, the time is shown in HKT time zone, unlike the time in server side code
          console.log({dateTime, now})
          if (dateTime < now) return
          this.setState({valid : true, token, id})
        }
      })
      .catch(error => {
      console.log(error)
      })
  }

  componentDidMount = async () => {
    const queryString = window.location.search;
    const token = new URLSearchParams(queryString).get("token");
    await this.checkValid(token)
  }

  render() {
    const {passwordError, confirmPassError, valid} = this.state
    return (
      <>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
          <title>Reset Password</title>
        </Helmet>
        {valid ? 
        <div id="test" className="d-flex justify-content-center p-5">
          <form onSubmit={this.submitPassword} className="shadow-sm" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <h2 className="text-center mb-4 fw-normal"><strong>Reset Password</strong></h2>
            <Alert severity="info">
              In order to protect your account, please make sure your new password:
              <li>Is between 8 to 16 characters</li>
              <li>Contains at least one uppercase letter</li>
              <li>Is different to previous used passwords</li>
            </Alert>
              <div className='mb-4'>
                <label for="password" class="col-form-label"><strong><small>New Password</small></strong></label>
                <input type="password" id="newPass" className={`${passwordError === "OK" ? "is-valid" : passwordError ? "is-invalid" : ""} form-control form-control-sm mb-1`} onChange={this.handleOnChange} required />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                <label for="email" class="col-form-label"><strong><small>Confirm New Password</small></strong></label>
                <input type="password" id="confirmPass" className={`${confirmPassError === "OK" ? "is-valid" : confirmPassError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} onChange={this.handleOnChange} required />
                {confirmPassError && <div className="invalid-feedback">{confirmPassError}</div>}
              </div>
            <div className="d-grid gap-2 mt-2">
              <button className="shadow-sm btn btn-outline-primary rounded-pill border-2"><b>Reset Password</b></button>
              <Link to="/sign-in" type="button" id="toSignInPage" style={{"display" : "none"}}/>
            </div>
          </form>
        </div>
        :
        <div className='container p-5'>
          <Alert severity="error" className='mt-5'>
            <AlertTitle><b>Error</b></AlertTitle>
            The account recovery session has expired or the token is invalid. Please select '<Link to="/forgot" className='text-decoration-none'>Forgot password?</Link>' and start again.
          </Alert>
        </div>
        }
      </>
    );
  }
}
export default ResetPwd;

