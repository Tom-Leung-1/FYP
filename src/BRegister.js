import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './BRegister.css';
import ReCAPTCHA from "react-google-recaptcha";
import GM from "./components/GoogleMap/GoogleMap"
import axios from "axios"
import config from "./config/config.json"

/*@TODO
set the recaptcha (fetch)
add a "please provide a valid image file in the BR tab" -> bug (the file chosen does not reflect the state change -> need a better input css)
*/

const HK = [ 
            "Central and Western",
            "Eastern",
            "Southern",
            "Wan Chai" 
           ];

const KL = [ 
            "Kowloon City",
            "Kwun Tong",
            "Sham Shui Po",
            "Wong Tai Sin",
            "Yau Tsim Mong"
           ];

const NT = [
            "Islands",
            "Kwai Tsing",
            "North",
            "Sai Kung",
            "Sha Tin",
            "Tai Po",
            "Tsuen Wan",
            "Tuen Mun",
            "Yuen Long" 
           ];

const key = config["REACT_APP_GOOGLE_KEY"]

class BRegister extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
                       Valid: false,
                       selectedFile: null,
                       address: null,
                       marker: null,
                       map : null,
                       token : "",
                     };
    }
    changeAddress = (event) => {
      this.setState({address : event.target.value})
    }

    handleRecaptcha = (token) => {
      this.setState({token})
    }

    onMarkerComplete = marker => {
      this.state.marker?.setMap(null);
      const lat = marker.position.lat()
      const lng = marker.position.lng()
      console.log(marker)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      .then(response => response.json())
      .then(data => this.setState({marker:marker, address : data.results[0].formatted_address}));
    }

    fileSelectedHandler = event => {
      if (event.target.files.length === 0) {
        this.setState({selectedFile: null})
        return
      }
      const file = event.target.files[0]
      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== 'png' && fileExtension !== 'jpg'  && fileExtension !== 'jpeg') {
        console.log("No other extension but image!")
        this.setState({selectedFile: null})
        return
      }
      this.setState({selectedFile:event.target.files[0]})
    }

    reset = event => {
      document.getElementById('Bform').reset()
      this.setState({selectedFile:null})
    }

    fileUploadHandler = event => {
      if (!this.state.selectedFile) {
        console.log("no")
        return
      }
      const formData = new FormData();
      const imagefile = this.state.selectedFile;
      formData.append("file", imagefile);
      axios.post('http://localhost:3001/upload', formData, {
        //headers: {'Content-Type': 'multipart/form-data'}
      }).then(res=> {
        console.log(res.statusText)
      }).catch(error=> {
        console.log("caught it!",error)
      }) 
    }

    checkRecaptcha = () => {
      //have to do this in backend, frontend dont allow cors
      axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${config["REACT_RECAPTCHA_SECRET_KEY"]}&response=${this.state.token}`,
      {method:"POST"})
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
    }

    submit = event => {
      this.fileUploadHandler(event)
      this.checkRecaptcha()
    }

    render() {
      console.log("testing", process.env.REACT_RECAPTCHA_SITE_KEY)
        return (
            <div className="">
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            </Helmet>

            <div id="BformDiv" className="justify-content-center p-5">
            <form id="Bform">

              <h2 className="fw-normal"><strong>Title</strong></h2>
              <hr className="mb-5" />

              <div class="card" style={{backgroundColor: "#6E5EFE", borderRadius: "6px"}}>
              <div class="card-header text-white">Please provide the following information to us.</div>
              <div class="card-body bg-light">

              <small className="text-secondary">* : Required</small>

              <div class="row mb-4">
                <div class="col-sm-6 col-lg-4">
                  <label for="first" class="form-label required"><b><small>First Name</small></b></label>
                  <input type="text" id="first" class="form-control form-control-sm shadow-sm" placeholder="Tai Man" />
                </div>
                <div class="col-sm-6 col-lg-4">
                 <label for="last" class="form-label required"><b><small>Last Name</small></b></label>
                  <input type="text" id="last" class="form-control form-control-sm shadow-sm" placeholder="Chan" />
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-sm-5 col-lg-3">
                  <label for="phone" class="form-label required"><b><small>Business Phone Number</small></b></label>
                  <input type="text" id="phone" class="form-control form-control-sm shadow-sm" placeholder="E.g. 23456781" />
                </div>
                <div class="col-sm-4 col-lg-2">
                  <label for="id" class="form-label required"><b><small>ID Card Number</small></b></label>
                  <input type="text" id="id" class="form-control form-control-sm shadow-sm" placeholder="E.g. A123456(7)" />
                </div>
              </div>
              <div class="row mb-4">
                <div>
                  <label for="upload" class="form-label required"><b><small>Upload Business Registration (BR)</small></b></label>
                  <br/>
                  <div class="input-group mb-3">
                  <input type="file" onChange={this.fileSelectedHandler} class="custom-file-input" id="inputGroupFile01"/>
                  </div>
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-lg-8">
                  <label for="shopname" class="form-label required"><b><small>Shop Name</small></b></label>
                  <input type="text" id="shopname" class="form-control form-control-sm shadow-sm" />
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-lg-8">
                  <label for="address" class="form-label required"><b><small>Address</small></b></label>
                  <input type="text" id="address" class="form-control form-control-sm shadow-sm" value={this.state.address} onChange={this.changeAddress}/>
                  <GM setMarker={this.onMarkerComplete}/>
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-lg-8">
                  <label for="district" class="form-label required"><b><small>District</small></b></label>
                  <select class="form-select form-select-sm shadow-sm" aria-label=".form-select-sm example">
                    <option selected hidden value="">Please select a district</option>
                    <optgroup className="RegHKArea" label="Hong Kong Island" style={{padding:"100px 0"}}>
                      {
                        HK.map((district)=>(<option value={district}>{district}</option>))
                      }
                    </optgroup>
                    <optgroup className="RegHKArea" label="Kowloon">
                      {
                        KL.map((district)=>(<option value={district}>{district}</option>))
                      }
                    </optgroup>
                    <optgroup className="RegHKArea" label="New Territories">
                      {
                        NT.map((district)=>(<option value={district}>{district}</option>))
                      }
                    </optgroup>
                  </select>
                </div>
              </div>
              
              <div class="row mb-4">
                <div class="col-lg-8">
                  <label for="description" class="form-label"><b><small>Description</small></b></label>
                  <textarea type="text" id="description" class="form-control shadow-sm" style={{height: "100px"}} />
                </div>
              </div>
              <ReCAPTCHA sitekey={config["REACT_RECAPTCHA_SITE_KEY"]} onChange={this.handleRecaptcha}/>
              <div class="row mb-4">
                <div>
                  <button type="button" id="upload" onClick={this.submit} class="btn btn-sm shadow-sm float-right" style={{backgroundColor: "#3F5BFF", color: "white"}}><b>Submit</b></button>
                  <button type="button" id="upload" class="btn btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right" onClick={this.reset}><b>Reset</b></button>
                </div>
              </div>

              </div>
              </div>

            </form>

            </div>
            
            </div>

            
            
        );
    }
}
export default BRegister;
