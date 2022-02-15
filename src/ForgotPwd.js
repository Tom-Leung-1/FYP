import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import LargeTextInput from "./components/Inputs/LargeTextInput"
import {withRouter} from 'react-router';
import axios from "axios"

class ForgotPwd extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
                       emailValue: '',
                       emailError: '',
        };
    }

    handleOnChange = (e) => {
      const {id} = e.currentTarget;
      this.setState({ emailValue: e.currentTarget.value })
      this.checkEmail(e);
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

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
      const {email, emailError} = this.state
        return (
            <>
              <div className="">
                <Helmet>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                </Helmet>
                <div id="test" className="d-flex justify-content-center p-5">
                  <form onSubmit={this.submitForm} className="shadow-sm" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <h2 className="text-center mb-4 fw-normal"><strong>Forgot your password?</strong></h2>
                    <p className='text-center'>
                    <small class="text-muted">
                      Enter the email address associated with your account and we will send an email with link to reset your password.
                    </small>
                    </p>
                    
                    <div className="form-floating mb-4">
                      <LargeTextInput value={email} type="email" id="email" placeholder="Email address" onChange={this.handleOnChange} name="Email Address" errorMsg={emailError} />
                    </div>

                    <div className="d-grid gap-2 mb-2">
                      <Link to="/send" type="button" className="shadow-sm btn btn-outline-primary rounded-pill border-2" onClick={""}><b>SEND EMAIL</b></Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
        );
    }
}
export default withRouter(ForgotPwd);
