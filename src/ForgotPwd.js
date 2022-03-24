import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import LargeTextInput from "./components/Inputs/LargeTextInput"
import emailjs from '@emailjs/browser';
import {withRouter} from 'react-router';
import { ReactComponent as forgotIcon } from './images/password_forgot.svg';

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

    submitForm = async (e) => {
      e.preventDefault()
      // check email in db
      const {emailValue} = this.state
      await axios.get(`http://localhost:3001/checkEmail?email=${emailValue}`)
      .then(async (response) => {
        if (!response.data.length) {
          alert("No relevant email addresses are found in the database!")
          return
        }
        await axios.post(`http://localhost:3001/sendEmail`, {emailValue})
        .then(async (response) => {
          console.log(response.data.token)
          const templateParams = {
            to_email : emailValue,
            token : response.data.token,
          }
          emailjs.init("3ElvtargFj-dF39Sz")
          emailjs.send("service_7w75x0d", "contact_form", templateParams)
          .then(response => {
            console.log(response)
          })
        })
        .catch(error => {
          console.log(error)
          alert("There is a server error. Please try again.")
          return
        })
        document.querySelector("#toSendPage").click()
      })
      .catch(error => {
        console.log(error)
        return
      })
    }

    render() {
      const {email, emailError} = this.state
        return (
            <>
              <div className="forgot">
                <Helmet>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                </Helmet>
                <div id="test" className="d-flex justify-content-center p-5">
                  <form onSubmit={this.submitForm} className="shadow-sm" style={{ fontFamily: 'Ubuntu', width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    <h2 className="text-center mb-4 fw-normal"><strong>Forgot your password?</strong></h2>
                    <p className='text-center'>
                    <small class="text-muted">
                      Enter the email address associated with your account and we will send a link to your email to reset your password.
                    </small>
                    </p>
                    
                    <div className="form-floating mb-4">
                      <LargeTextInput value={email} type="email" id="email" placeholder="Email address" onChange={this.handleOnChange} name="Email Address" errorMsg={emailError} />
                    </div>

                    <div className="d-grid gap-2 mb-2">
                      <button className="shadow-sm btn btn-outline-primary rounded-pill border-2"><b>SEND EMAIL</b></button>
                      <Link type="button" id="toSendPage" to="/send" style={{"display" : "none"}}/>
                    </div>
                  </form>
                </div>
              </div>
            </>
        );
    }
}
export default withRouter(ForgotPwd);
