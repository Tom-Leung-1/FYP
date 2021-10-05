import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import LargeTextInput from "./components/Inputs/LargeTextInput"
var CryptoJS = require("crypto-js");

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = { usernameValid: false,
                       emailValid: false,
                       passwordValid: false,
                       confirmPassValid: false,
                       usernameValue: '',
                       emailValue: '',
                       passwordValue: '',
                       usernameError: '',
                       emailError: '',
                       passwordError: '',
                       confirmPassError: '',
                       showPass: false 
                     };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    checkUsername (e) {
        const value = e.target.value;
        const validName = /^\w{6,20}$/;
        if (value === "")
        {
          this.setState({usernameValid: false});
          this.setState({usernameError: 'Username cannot be empty.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validName)))
        {
          this.setState({usernameValid: false});
          this.setState({usernameError: 'Username should be between 6 to 20 characters, which contain only characters, numeric digits and underscore.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({usernameValid: true});
          this.setState({usernameError: 'OK'});
          this.setState({usernameValue: value});
          //e.target.classList.remove("is-invalid");
          //e.target.classList.add('is-valid');
        }
    }

    checkEmail (e) {
        const value = e.target.value;
        //email validation, Ref: https://www.w3resource.com/javascript/form/email-validation.php
        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value === "")
        {
          this.setState({emailValid: false});
          this.setState({emailError: 'Email Address cannot be empty.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validEmail)))
        {
          this.setState({emailValid: false});
          this.setState({emailError: 'Invalid email address.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({emailValid: true});
          this.setState({emailError: 'OK'});
          this.setState({emailValue: value});
          //e.target.classList.remove("is-invalid");
          //e.target.classList.add('is-valid');
        }
    }
  
    checkPassword (e) {
        const value = e.target.value;
        const validPass = /^(?=.*[A-Z]).{8,16}$/;
        if (value === "")
        {
          this.setState({passwordValid: false});
          this.setState({passwordError: 'Password cannot be empty.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validPass)))
        {
          this.setState({passwordValid: false});
          this.setState({passwordError: 'Password should be between 8 to 16 characters, which contain at least one uppercase letter.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({passwordValid: true});
          this.setState({passwordError: 'OK'});
          this.setState({password: CryptoJS.MD5(value).toString()});
          //e.target.classList.remove("is-invalid");
          //e.target.classList.add('is-valid');
        }
    }

    confirmPassword (e) {
        const value = e.target.value;
        if (value === "")
        {
          this.setState({confirmPassValid: false});
          this.setState({confirmPassError: 'Please enter your password again for confirmation.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else if (value != document.getElementById("password").value)
        {
          this.setState({confirmPassValid: false});
          this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
          //e.target.classList.remove("is-valid");
          //e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({confirmPassValid: true});
          this.setState({confirmPassError: 'OK'});
          //e.target.classList.remove("is-invalid");
          //e.target.classList.add('is-valid');
        }
    }

    showPass() {
        if (this.state.showPass != true)
          this.setState({showPass: true});
        else
          this.setState({showPass: false});
    }

    checkForm() {
      let username = document.getElementById("username");
      let email = document.getElementById("email");
      let confirmPass = document.getElementById("confirmpass");
      let password = document.getElementById("password");
      let allClear = true;

      if (this.state.usernameValid === false)
      {
        username.classList.remove("is-valid");
        username.classList.add('is-invalid');  
        allClear = false;       
      }
      if (this.state.emailValid === false)
      {
        email.classList.remove("is-valid");
        email.classList.add('is-invalid'); 
        allClear = false;
      }
      if (this.state.passwordValid === false)
      {
        password.classList.remove("is-valid");
        password.classList.add('is-invalid'); 
        allClear = false;
      }
      if (this.state.confirmPassValid === false)
      {
        confirmPass.classList.remove("is-valid");
        confirmPass.classList.add('is-invalid'); 
        allClear = false;
      }
      if (password.value != confirmPass.value)
      {
        this.setState({confirmPassValid: false});
        this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
        confirmPass.classList.remove("is-valid");
        confirmPass.classList.add('is-invalid');
        allClear = false;
      }
      if (allClear)
      {
        alert('Successfully sign up!');
      }

  }

    render() {
        return (
            <>
            <div className="signup">
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>
            <div id="signUpBox" className="d-flex justify-content-center p-5">

            <form className="shadow-lg" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <h2 className="text-center mb-4 fw-normal"><strong>Create your account</strong></h2>
              
              <div className="form-floating mb-3">
                <LargeTextInput type="text" id="username" placeholder="Username" onChange={(event) => this.checkUsername(event)} name="Username" errorMsg={this.state.usernameError} />
              </div>

              <div className="form-floating mb-3">
                <LargeTextInput type="email" id="email" placeholder="Email" onChange={(event) => this.checkEmail(event)} name="Email Address" errorMsg={this.state.emailError} />
              </div>

              <div className="form-floating mb-3">
                <LargeTextInput type={this.state.showPass ? "text" : "password"} id="password" placeholder="Password" onChange={(event) => this.checkPassword(event)} name="Password" errorMsg={this.state.passwordError} />
              </div>

              <div className="form-floating mb-1">
                <LargeTextInput type={this.state.showPass ? "text" : "password"} id="confirmpass" placeholder="Confirm password" onChange={(event) => this.confirmPassword(event)} name="Confirm password" errorMsg={this.state.confirmPassError} />
              </div>
              
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" value="" id="showPass" onClick={()=>this.showPass()}></input>
                <label className="form-check-label" for="showPass">Show Password</label>
              </div>

              <div className="d-grid gap-2 mb-2">
                <button type="button" className="shadow-sm btn btn-outline-primary rounded-pill border-2" onClick={()=>this.checkForm()}><b>SIGN UP</b></button>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <Link to="/sign-in" type="button" className="btn btn-link text-decoration-none"><small>Already have an account? Sign in</small></Link>
              </div>

              <div className="mt-5"> 
              <p className="text-muted text-center">Copyright &copy; Test 2021.</p>
              </div>
            </form>

            </div>

            </div>
            </>
        );
    }
}

export default SignUp;