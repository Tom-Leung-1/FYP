import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.state = { usernameValid: false,
                       emailValid: false,
                       passwordValid: false,
                       confirmPassValid: false,
                       usernameError: 'Please set your username.',
                       emailError: 'Please enter your email address.',
                       passwordError: 'Please set your password.',
                       confirmPassError: 'Please enter your password again for confirmation.',
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
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validName)))
        {
          this.setState({usernameValid: false});
          this.setState({usernameError: 'Username should be between 6 to 20 characters, which contain only characters, numeric digits and underscore.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({usernameValid: true});
          this.setState({usernameError: ''});
          e.target.classList.remove("is-invalid");
          e.target.classList.add('is-valid');
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
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validEmail)))
        {
          this.setState({emailValid: false});
          this.setState({emailError: 'Invalid email address.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({emailValid: true});
          this.setState({emailError: ''});
          e.target.classList.remove("is-invalid");
          e.target.classList.add('is-valid');
        }
    }
  
    checkPassword (e) {
        const value = e.target.value;
        const validPass = /^(?=.*[A-Z]).{8,16}$/;
        if (value === "")
        {
          this.setState({passwordValid: false});
          this.setState({passwordError: 'Password cannot be empty.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else if (!(value.match(validPass)))
        {
          this.setState({passwordValid: false});
          this.setState({passwordError: 'Password should be between 8 to 16 characters, which contain at least one uppercase letter.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({passwordValid: true});
          this.setState({passwordError: ''});
          e.target.classList.remove("is-invalid");
          e.target.classList.add('is-valid');
        }
    }

    confirmPassword (e) {
        const value = e.target.value;
        if (value === "")
        {
          this.setState({confirmPassValid: false});
          this.setState({confirmPassError: 'Please enter your password again for confirmation.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else if (value != document.getElementById("password").value)
        {
          this.setState({confirmPassValid: false});
          this.setState({confirmPassError: 'The Confirm Password confirmation does not match.'});
          e.target.classList.remove("is-valid");
          e.target.classList.add('is-invalid');
        }
        else
        {
          this.setState({confirmPassValid: true});
          this.setState({confirmPassError: ''});
          e.target.classList.remove("is-invalid");
          e.target.classList.add('is-valid');
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
            <div id="test" className="d-flex justify-content-center p-5">

            <form className="shadow-lg" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <h2 className="text-center mb-4 fw-normal"><strong>Create your account</strong></h2>
              
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" placeholder="Username" onChange={(event) => this.checkUsername(event)}></input>
                <label for="username" className="text-secondary">Username</label>
                <div className="invalid-feedback" id="username-feedback">{this.state.usernameError}</div>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={(event) => this.checkEmail(event)}></input>
                <label for="email" className="text-secondary">Email Address</label>
                <div className="invalid-feedback" id="email-feedback">{this.state.emailError}</div>
              </div>

              <div className="form-floating mb-3">
                <input type={this.state.showPass ? "text" : "password"} className="form-control" id="password" placeholder="Password" onChange={(event) => this.checkPassword(event)}></input>
                <label for="password" className="text-secondary">Password</label>
                <div className="invalid-feedback" id="password-feedback">{this.state.passwordError}</div>
              </div>

              <div className="form-floating mb-1">
                <input type={this.state.showPass ? "text" : "password"} className="form-control" id="confirmpass" placeholder="Confirm password" onChange={(event) => this.confirmPassword(event)}></input>
                <label for="password" className="text-secondary">Confirm password</label>
                <div className="invalid-feedback" id="password-feedback">{this.state.confirmPassError}</div>
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