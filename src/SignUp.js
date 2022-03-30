import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import LargeTextInput from "./components/Inputs/LargeTextInput"
import axios from "axios"
import {withRouter} from 'react-router';

var CryptoJS = require("crypto-js");

class SignUp extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
      usernameValue: '',
      emailValue: '',
      phoneValue: '',
      password: '',
      usernameError: '',
      emailError: '',
      phoneError: '',
      passwordError: '',
      confirmPassError: '',
      showPass: false 
    };
  }

  componentDidMount() {
      window.scrollTo(0, 0);
  }

  handleOnChange = (e) => {
      const {id} = e.currentTarget
      if (!(id === "password" || id === "confirmpass")) this.setState({ [id + "Value"]: e.currentTarget.value })
      this.checkError(e);
  }

  checkError = (e) => {
    const {id} = e.currentTarget
    switch (id) {
      case "email":
        this.checkEmail(e)
        break
      case "password":
        this.checkPassword(e)
        break
      case "confirmpass":
        this.confirmPassword(e)
        break
      case "username":
        this.checkUsername(e)
        break
      case "phone":
        this.checkPhone(e)
        break
      default:
        break
    }
  }

  checkUsername (e) {
      const value = e.target.value;
      const validName = /^\w{6,20}$/;
      if (value === "") {
        this.setState({usernameError: 'Username cannot be empty.'});
        return
      }
      if (!(value.match(validName))) {
        this.setState({usernameError: 'Username should be between 6 to 20 characters, which contain only characters, numeric digits and underscore.'});
        return
      }
      this.setState({usernameError: 'OK'});
  }

  checkEmail (e) {
      const value = e.target.value;
      //email validation, Ref: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value === "") {
        this.setState({emailError: 'Email Address cannot be empty.'});
        return;
      }
      if (!(value.match(validEmail))) {
        this.setState({emailError: 'Invalid email address.'});
        return;
      }
      this.setState({emailError: 'OK'});
  }

  checkPhone (e) {
    const value = e.target.value;
    const validPhone = /^\d{8}$/;
    if (value === "") {
      this.setState({phoneError: 'Phone number cannot be empty.'});
      return
    }
    if (!(value.match(validPhone))) {
      this.setState({phoneError: 'Please provide a valid phone number which contains only 8 digits.'});
      return
    }
    this.setState({phoneError: 'OK'});
  }
  
  checkPassword (e) {
      const value = e.target.value;
      const validPass = /^(?=.*[A-Z]).{8,16}$/;
      if (value === "") {
        this.setState({passwordError: 'Password cannot be empty.'});
        return
      }
      if (!(value.match(validPass))) {
        this.setState({passwordError: 'Password should be between 8 to 16 characters, which contain at least one uppercase letter.'});
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
      if (value != document.getElementById("password").value) {
        this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
          return
      }
      this.setState({confirmPassError: 'OK'});
  }

  showPass = () => {
    const {showPass} = this.state
    this.setState({showPass: !showPass});
  }

  submitForm = (e) => {
    e.preventDefault()
    if (this.checkForm()) {
      const { usernameValue, emailValue, password, phoneValue} = this.state
      axios.post(`http://localhost:3001/signup`, {usernameValue, emailValue, phoneValue, password})
        .then(response => {
          console.log(response)
          alert("done!")
          this.props.signInSetting(response.data)
          this.props.history.push('/UserType')
        })
        .catch(error => {
          if (error.response.status === 401) {
            alert("Username or email is already used. Please use another.")
          }
        })
    }
  }

  checkForm() {
    const {usernameError, emailError, phoneError, passwordError, confirmPassError} = this.state
    if (usernameError + passwordError + emailError + confirmPassError + phoneError === "OKOKOKOKOK") {
      alert('Successfully sign up!');
      return true;
    }
    alert("Some credentials are not valid. Please check them again.")
    return false
  }

  render() {
    const {usernameError, emailError, phoneError, passwordError, confirmPassError} = this.state
    return (
      <>
        <div className="signup">
          <Helmet>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            <title>Sign Up</title>
          </Helmet>
          <div id="signUpBox" className="d-flex justify-content-center p-5">
            <form onSubmit={this.submitForm} className="shadow-lg" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <h2 className="text-center mb-4 fw-normal"><strong>Create your account</strong></h2>
              <div className="form-floating mb-3">
                <LargeTextInput type="text" id="username" placeholder="Username" onChange={this.handleOnChange} name="Username" errorMsg={usernameError} />
              </div>
              <div className="form-floating mb-3">
                <LargeTextInput type="email" id="email" placeholder="Email" onChange={this.handleOnChange} name="Email Address" errorMsg={emailError} />
              </div>
              <div className="form-floating mb-3">
                <LargeTextInput type="text" id="phone" placeholder="Phone" onChange={this.handleOnChange} name="Phone Number" errorMsg={phoneError} />
              </div>
              <div className="form-floating mb-3">
                <LargeTextInput type={this.state.showPass ? "text" : "password"} id="password" placeholder="Password" onChange={this.handleOnChange} name="Password" errorMsg={passwordError} />
              </div>
              <div className="form-floating mb-1">
                <LargeTextInput type={this.state.showPass ? "text" : "password"} id="confirmpass" placeholder="Confirm password" onChange={this.handleOnChange} name="Confirm password" errorMsg={confirmPassError} />
              </div>
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" value="" id="showPass" onClick={this.showPass}></input>
                <label className="form-check-label" for="showPass">Show Password</label>
              </div>
              <div className="d-grid gap-2 mb-2">
                <button type="submit" className="shadow-sm btn btn-outline-primary rounded-pill border-2"><b>SIGN UP</b></button>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <Link to="/sign-in" type="button" className="btn btn-link text-decoration-none"><small>Already have an account? Sign in</small></Link>
              </div>
              <div className="mt-5"> 
              <p className="text-muted text-center">Copyright &copy; Foodcreek 2021.</p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SignUp);