import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class UProfileSetting extends Component {
    
    constructor(props) {
        super(props);
        this.state = { usernameValue: '',
                       emailValue: '',
                       phoneValue: '',
                       addressValue:'',
                       usernameError: '',
                       emailError: '',
                       phoneError: '',
                     };
    }

    handleOnChange = (e) => {
        const {id} = e.currentTarget
        this.setState({ [id + "Value"]: e.currentTarget.value })
        this.checkError(e);
    }

    checkError = (e) => {
        const {id} = e.currentTarget
        switch (id) {
          case "phone":
            this.checkPhone(e)
            break
          case "email":
            this.checkEmail(e)
            break
          case "username":
            this.checkUsername(e)
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
          this.setState({phoneError: 'Phone no. cannot be empty.'});
          return
        }
        if (!(value.match(validPhone))) {
          this.setState({phoneError: 'Please provide a valid phone number which contains only 8 digits.'});
          return
        }
        this.setState({phoneError: 'OK'});
    }

    render() {
        const {usernameError, emailError, phoneError} = this.state
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
                  <li className="breadcrumb-item active" aria-current="page">Update User Profile</li>
                </ol>
              </nav>

            <h2 className="fw-normal"><strong>Update User Profile</strong></h2>
            <hr className="mb-4" />

            <form id="newform">
            <div class="mb-3 row">
                <label for="username" class="col-lg-2 col-sm-3 col-form-label">Username: </label>
                <div class="col-lg-4 col-sm-6">
                  <input id="username" className={`${usernameError === "OK" ? "is-valid" : usernameError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange} />
                  {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                </div>
            </div>
            <div class="mb-3 row">
                <label for="email" class="col-lg-2 col-sm-3 col-form-label">Email Address: </label>
                <div class="col-lg-5 col-sm-7">
                  <input type="email" id="email" className={`${emailError === "OK" ? "is-valid" : emailError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange} />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
            </div>
            <div class="mb-3 row">
                <label for="phone" class="col-lg-2 col-sm-3 col-form-label">Phone No.: </label>
                <div class="col-lg-3 col-sm-4">
                  <input id="phone" className={`${phoneError === "OK" ? "is-valid" : phoneError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange}/>
                  {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                </div>
            </div>
            <div class="mb-3 row">
                <label for="phone" class="col-lg-2 col-sm-3 col-form-label">Address: </label>
                <div class="col-lg-5 col-sm-7">
                  <textarea id="address" class="form-control form-control-sm mb-3" onChange={this.handleOnChange} />
                </div>
            </div>

            <div class="d-grid gap-2 col-2 mx-auto">
              <button type="submit" class="btn btn-sm btn-primary" style={{backgroundColor:"#6E5EFE"}}>Save</button>
            </div>
            </form>
            </div>

            </>


            
            
        );
    }
}
export default UProfileSetting;

