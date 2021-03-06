import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import LargeTextInput from "./components/Inputs/LargeTextInput"
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import {withRouter} from 'react-router';
import axios from "axios"

var CryptoJS = require("crypto-js");

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
          username: '',
          password: '',
          usernameError: '',
          passwordError: '',
          showPass: false,
          failOpen: false,
          succOpen: false,
          notValidated: false,
        };
    }

    submitForm = async (e) => {
      e.preventDefault()
      if (this.checkForm()) {
        const { username, password} = this.state
        axios.post(`http://localhost:3001/signin`, {username, password})
          .then(response => {
            console.log(response)
            //alert("done!")
            this.setState({succOpen: true});
            this.props.signInSetting(response.data[0])
            setTimeout(() => { this.setState({succOpen: false}); }, 700);
            setTimeout(() => { this.props.history.push('/UserType') }, 1000);
          })
          .catch(error => {
            if (error.response.status === 400) {
              //alert("user not found! Please check credentials again.")
              this.setState({failOpen: true});
              setTimeout(() => { this.setState({failOpen: false}); }, 1000);
            }
            if (error.response.status === 401) {
              //alert("user not found! Please check credentials again.")
              this.setState({notValidated: true});
              setTimeout(() => { this.setState({notValidated: false}); }, 1000);
            }
            console.log(error)
          })
      }
    }

    handleOnChange = (e) => {
      const {id} = e.currentTarget
      switch (id) {
        case "username":
          this.checkUsername(e)
          break
        case "password":
          this.checkPassword(e)
          break
        default:
          break
      }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    checkUsername = (e) => {
        const value = e.target.value;
        this.setState({username : value})
        if (value === "") {
          this.setState({usernameError: 'Username cannot be empty.'});
          return
        }
        this.setState({usernameError: 'OK'});
    }
  
    checkPassword = (e) => {
        const value = e.target.value;
        this.setState({password: CryptoJS.MD5(value).toString()});
        if (value === "") {
          this.setState({passwordError: 'Password cannot be empty.'});
          return
        }
        this.setState({passwordError: 'OK'});
    }

    showPass = () => {
      const {showPass} = this.state
      this.setState({showPass: !showPass});
    }

    checkForm = () => {
      const {usernameError, passwordError} = this.state
      return (usernameError + passwordError === "OKOK")
    }

    closeMessage = (msg) => {
      this.setState({[msg]: false});
    }

    render() {
      const {username, showPass, usernameError, passwordError} = this.state
        return (
            <>
              <div className="login">
                <Helmet>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                  <title>Sign in</title>
                </Helmet>
                <div id="test" className="d-flex justify-content-center p-5">
                  <form onSubmit={this.submitForm} className="shadow-lg" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <h2 className="text-center mb-4 fw-normal"><strong>Sign in</strong></h2>
                    
                    <div className="form-floating mb-3">
                      <LargeTextInput value={username} type="text" id="username" placeholder="Username" onChange={this.handleOnChange} name="Username" errorMsg={usernameError} />
                    </div>

                    <div className="form-floating mb-1">
                      <LargeTextInput type={showPass ? "text" : "password"} id="password" placeholder="Password" onChange={this.handleOnChange} name="Password" errorMsg={passwordError} />
                    </div>
                    
                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" value="" id="showPass" onClick={this.showPass}></input>
                      <label className="form-check-label" for="showPass">Show Password</label>
                    </div>

                    <div className="d-grid gap-2 mb-2">
                      <button type="submit" className="shadow-sm btn btn-outline-primary rounded-pill border-2" onClick={this.checkForm}><b>SIGN IN</b></button>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-center">
                      <Link to="/forgot" type="button" className="btn btn-link text-decoration-none me-md-5"><small>Forgot password?</small></Link>
                      <Link to="/sign-up" type="button" className="btn btn-link text-decoration-none"><small>Don't have an account? Sign Up</small></Link>
                    </div>

                    <div className="mt-5"> 
                      <p className="text-muted text-center">Copyright &copy; Foodcreek 2021.</p>
                    </div>
                  </form>
                </div>
              </div>

              <Snackbar
                  sx={{ height: "100%", alignItems: 'center' }}
                  open={this.state.failOpen}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  onClose={() => this.closeMessage("failOpen")}
                  TransitionComponent={Fade}
              >
                <Alert severity="error" variant="filled" sx={{ width: "100%"}}>
                    User not found! Please check credentials again
                </Alert>
              </Snackbar>
              <Snackbar
                  sx={{ height: "100%", alignItems: 'center' }}
                  open={this.state.notValidated}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  onClose={() => this.closeMessage("notValidated")}
                  TransitionComponent={Fade}
              >
                <Alert severity="error" variant="filled" sx={{ width: "100%"}}>
                  The account is not validated. Please activate the account via email.
                </Alert>
              </Snackbar>
              <Snackbar
                  sx={{ height: "100%", alignItems: 'center' }}
                  open={this.state.succOpen}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  onClose={() => this.closeMessage()}
                  TransitionComponent={Fade}
              >
                <Alert severity="success" variant="filled" sx={{ width: "100%"}}>
                    Log in Successfully
                </Alert>
              </Snackbar>
            </>
        );
    }
}
export default withRouter(Login);

//<button type="button" className="btn btn-link text-decoration-none me-md-5" disabled><small>Forgot password?</small></button>
