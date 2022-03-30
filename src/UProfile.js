import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';

class UProfile extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
      email : "",
      phone : "",
      username : "",
    };
  }

  getUserProfile = async () => {
    const {userId} = this.props
    console.log(userId)
    let data
    await axios.get(`http://localhost:3001/getUserProfile?id=${userId}`)
    .then(response => {
      console.log(response.data[0])
      data = response.data[0]
    })
    .catch(error => {
      console.log(error)
    })
    console.log(data)
    return data
  }

  componentDidMount = async () => {
    const {email, phone, username} = await this.getUserProfile()
    this.setState({email, phone, username})
  }

  render() {
    const {email, phone, username} = this.state
    return (
      <>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
        </Helmet>
        <div id="" className="container p-3">
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
              <Link to="/ClientOption" className="breadcrumb-item text-decoration-none">Normal Customer</Link>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>
          <h2 className="fw-normal"><strong>User Profile</strong></h2>
          <hr className="mb-4" />
          <table class="table table-hover">
            <tr>
              <th>Username</th>
              <td id="uname">{username}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td id="uemail">{email}</td>
            </tr>
            <tr>
              <th>Phone No.</th>
              <td id="uphone">{phone}</td>
            </tr>
          </table>
          <Link to="./UProfileSetting" type="button" className="btn btn-sm btn-primary mr-2 border-0" style={{backgroundColor:"#6E5EFE"}}>Update Profile</Link>
          <Link to="./UpdatePwd" type="button" className="btn btn-sm btn-primary m-2 border-0" style={{backgroundColor:"#6E5EFE"}}>Change Password</Link>
        </div>
      </>
    );
  }
}
export default UProfile;
