import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { queryAllByAltText } from '@testing-library/react';

class UProfileSetting extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      phone: '',
      usernameBefore: '',
      emailBefore: '',
      phoneBefore: '',
      usernameError: 'OK',
      emailError: 'OK',
      phoneError: 'OK',
    };
  }

  handleOnChange = (e) => {
    const {id} = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
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

  checkInUse = async () => { // existing Name / email
    const {username, email, usernameBefore, emailBefore} = this.state
    let inUse = false
    await axios.get(`http://localhost:3001/checkInUse?username=${username}&email=${email}`)
    .then(response => {
      const otherUsers = response.data.filter(datum => datum.username !== usernameBefore && datum.email !== emailBefore)
      console.log(otherUsers)
      if (otherUsers.length) {
        inUse = true
      }
    })
    .catch(error => {
      console.log(error)
    })
    return inUse
  }

  updateProfile = async () => {
    const {username, email, phone} = this.state
    const {userId} = this.props
    let reply
    await axios.post(`http://localhost:3001/updateProfile`, {username, email, phone, userId})
    .then(response => {
      console.log(response)
      reply = "credentials have been updated successfully!"
    })
    .catch(error => {
      console.log(error)
      reply = "There is a server error, please try again later."
    })
    return reply
  }
  
  submitForm = async (e) => {
    e.preventDefault()
    const {usernameError, emailError, phoneError} = this.state
    if (usernameError + emailError + phoneError !== "OKOKOK") {
      alert("Please provide valid inputs.")
      return 
    }
    if (await this.checkInUse()) {
      alert("The username or email is currently in use.")
      return
    }
    const reply = await this.updateProfile()
    alert(reply)
  }

  getUserProfile = async () => {
    const {userId} = this.props
    let data
    await axios.get(`http://localhost:3001/getUserProfile?id=${userId}`)
    .then(response => {
      console.log(response.data[0])
      data = response.data[0]
    })
    .catch(error => {
      console.log(error)
    })
    return data
  }


  componentDidMount = async () => {
    const {email, phone, username} = await this.getUserProfile()
    this.setState({email, phone, username, usernameBefore : username, emailBefore : email, phoneBefore : phone})
  }

  render() {
    const {username, email, phone, usernameError, emailError, phoneError} = this.state
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
          <form id="userUpdateForm" onSubmit={this.submitForm}>
            <div class="mb-3 row">
              <label for="username" class="col-lg-2 col-sm-3 col-form-label">Username: </label>
              <div class="col-lg-4 col-sm-6">
                <input value={username} id="username" className={`${usernameError === "OK" ? "is-valid" : usernameError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange} />
                {usernameError && <div className="invalid-feedback">{usernameError}</div>}
              </div>
            </div>
            <div class="mb-3 row">
              <label for="email" class="col-lg-2 col-sm-3 col-form-label">Email Address: </label>
              <div class="col-lg-5 col-sm-7">
                <input value={email} type="email" id="email" className={`${emailError === "OK" ? "is-valid" : emailError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange} />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
            </div>
            <div class="mb-3 row">
              <label for="phone" class="col-lg-2 col-sm-3 col-form-label">Phone No.: </label>
              <div class="col-lg-3 col-sm-4">
                <input value={phone} id="phone" className={`${phoneError === "OK" ? "is-valid" : phoneError ? "is-invalid" : ""} form-control form-control-sm mb-1 `} required onChange={this.handleOnChange}/>
                {phoneError && <div className="invalid-feedback">{phoneError}</div>}
              </div>
            </div>
            <div class="d-grid gap-2 col-2 mx-auto">
              <button type="submit" class="btn btn-sm btn-primary border-0" style={{backgroundColor:"#6E5EFE"}}>Save</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default UProfileSetting;

