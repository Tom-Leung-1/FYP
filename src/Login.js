import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { usernameValid: false,
                       passwordValid: false,
                       usernameError: 'Please enter your username.',
                       passwordError: 'Please enter your password.',
                       showPass: false 
                     };
        this.myRef = React.createRef()
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    checkUsername (e) {
        const value = e.target.value;
        if (value === "")
        {
          this.setState({usernameValid: false});
          this.setState({usernameError: 'Username cannot be empty.'});
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
  
    checkPassword (e) {
        const value = e.target.value;
        if (value === "")
        {
          this.setState({passwordValid: false});
          this.setState({passwordError: 'Password cannot be empty.'});
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

    showPass() {
        if (this.state.showPass !== true)
          this.setState({showPass: true});
        else
          this.setState({showPass: false});
    }

    checkForm() {
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        if (this.state.usernameValid === false)
        {
          username.classList.remove("is-valid");
          username.classList.add('is-invalid');         
        }
        else if (this.state.passwordValid === false)
        {
          password.classList.remove("is-valid");
          password.classList.add('is-invalid'); 
        }
        else
        {
          alert('Successfully log in!');
        }

    }

    render() {
        return (
            <>
            <div className="login">
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>
            <div id="test" className="d-flex justify-content-center p-5">

            <form className="shadow-lg" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <h2 className="text-center mb-4 fw-normal"><strong>Sign in</strong></h2>
              
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="username" placeholder="Username" onChange={(event) => this.checkUsername(event)}></input>
                <label for="username" className="text-secondary">Username</label>
                <div className="invalid-feedback" id="username-feedback">{this.state.usernameError}</div>
              </div>

              <div className="form-floating mb-1">
                <input type={this.state.showPass ? "text" : "password"} className="form-control" id="password" placeholder="Password" onChange={(event) => this.checkPassword(event)}></input>
                <label for="password" className="text-secondary">Password</label>
                <div className="invalid-feedback" id="password-feedback">{this.state.passwordError}</div>
              </div>
              
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" value="" id="showPass" onClick={()=>this.showPass()}></input>
                <label className="form-check-label" for="showPass">Show Password</label>
              </div>

              <div className="d-grid gap-2 mb-2">
                <button type="button" className="shadow-sm btn btn-outline-primary rounded-pill border-2" onClick={()=>this.checkForm()}><b>SIGN IN</b></button>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-center">
                <button type="button" className="btn btn-link text-decoration-none me-md-5"><small>Forgot password?</small></button>
                <Link to="/sign-up" type="button" className="btn btn-link text-decoration-none"><small>Don't have an account? Sign Up</small></Link>
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
export default Login;