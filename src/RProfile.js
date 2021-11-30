import React, { Component, Profiler } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Map from './components/GoogleMap/GoogleMap';
import axios from "axios"
import { lt } from 'date-fns/locale';

class RProfile extends Component {
    
    constructor(props) {
      super(props);
      this.state = { 
        data : null,
        lat: null,
        lng: null  
      };
    }

    getRegData = async (ownerRestaurantId) => {
      let data
      await axios.get(`http://localhost:3001/getRegData?id=${ownerRestaurantId}`)
        .then(response => {
          data = response.data
        })
        .catch(error => {
          console.log(error)
      })
      return data
    }

    componentDidMount = async () => {
      const {ownerRestaurantId} = this.props
      const data = await this.getRegData(ownerRestaurantId)
      console.log(data)
      this.setState({data})
      try
      {
        this.setState({lat: data[0].lat})
        this.setState({lng: data[0].lng})
      }
      catch (error)
      {
        console.log("no lat lng data");
      }
    }

    render() {
      const {data,lat,lng} = this.state
      return (
        <>
          <Helmet>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
          </Helmet>
          <div id="" className="container p-3">
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
                <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
                <li className="breadcrumb-item active" aria-current="page">Restaurant Profile</li>
            </ol>
          </nav>
            <h2 className="fw-normal"><strong>Restaurant Profile</strong></h2>
            <hr className="mb-4" />
            <Link to="./RProfileSetting" type="button" className="btn btn-primary mb-2 disabled">Update Profile</Link>
            <h5 className="fw-normal"><strong>Owner's Information:</strong></h5>
            <div className="row mb-2">
              <div className="col-sm-5 col-lg-3 mb-2">
                <label htmlFor="first" className="form-label"><b><small>First Name</small></b></label>
                <br/>
                {data ? data[0].first_name : "-"}
              </div>
              <div className="col-sm-5 col-lg-2">
              <label htmlFor="last" className="form-label"><b><small>Last Name</small></b></label>
              <br/>
              {data ? data[0].last_name : "-"}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-sm-5 col-lg-3 mb-2">
                <label htmlFor="phone" className="form-label"><b><small>Business Phone Number</small></b></label>
                <br/>
                {data ? data[0].phone : "-"}
              </div>
              <div className="col-sm-5 col-lg-2">
                <label htmlFor="id" className="form-label"><b><small>HKID Card Number</small></b></label>
                <br/>
                {data ? data[0].hkid : "-"}
              </div>
            </div>
            <h5 className="fw-normal"><strong>Restaurant's Information:</strong></h5>
            <div className="row mb-2">
              <div className="col-sm-5 col-lg-3 mb-2">
                <label htmlFor="rname" className="form-label"><b><small>Restaurant's Name</small></b></label>
                <br/>
                {data ? data[0].restaurant : "-"}
              </div>
              <div className="col-sm-5 col-lg-9">
              <label htmlFor="address" className="form-label"><b><small>Address</small></b></label>
              <br/>
              {data ? data[0].address : "-"}
              </div>
            </div>

            <div className="row mb-4">
              <label htmlFor="map" className="form-label"><b><small>Map</small></b></label>
              <br/>
              <Map position={{lat, lng}}/>
            </div>

            <div className="row mb-4">
              <div className="col-sm-5 col-lg-3 mb-4">
                <label htmlFor="hour" className="form-label"><b><small>Open Hours</small></b></label>
                <br/>
                {data ? data[0].open_hours : "-"}
              </div>
              <div className="col-sm-10 col-lg-10">
                <label htmlFor="description" className="form-label"><b><small>Description</small></b></label>
                <br/>
                {data ? data[0].description.length > 0 ? data[0].description : "No description" : "-"}
              </div>
            </div>
          </div>
        </>
      );
    }
}
export default RProfile;
