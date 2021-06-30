import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './BRegister.css';
import ReCAPTCHA from "react-google-recaptcha";
import GM from "./components/GoogleMap/GoogleMap"
import axios from "axios"
import config from "./config/config.json"
import hkid from 'validid/esm/hkid.mjs';
import normalize from 'validid/esm/utils/normalize.mjs';

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
                       firstValid: false,
                       lastValid: false,
                       phoneValid: false,
                       idValid: false,
                       shopnameValid: false,
                       districtValid: false,
                       firstError: 'Please input this field.',
                       lastError: 'Please input this field.',
                       phoneError: 'Please input this field.',
                       idError: 'Please input this field.',
                       shopnameError: 'Please input this field.',
                       districtError: 'Please select a district.',
                       selectedFile: null,
                       address: null,
                       marker: null,
                       map : null,
                       token : "",
                    
                     };
    }
        checkbox(e) {
      const id = e.target.id;
      const value = e.target.value;
      const validPhone = /^\d{8}$/;
      const validIdForm = /^[A-Z0-9]+\(+[A-Z0-9]+\)/;

      if (value === "")
      {
        this.setState({[id + "Valid"]: false});
        if (id === "district")
          this.setState({[id + "Error"]: 'Please select a district.'});
        else
          this.setState({[id + "Error"]: 'Please input this field.'});
        e.target.classList.remove("is-valid");
        e.target.classList.add('is-invalid');
      }
      else if (id === "phone" && !(value.match(validPhone)))
      {
        this.setState({phoneValid: false});
        this.setState({phoneError: 'Please provide a valid phone number which contains only 8 digits.'});
        e.target.classList.remove("is-valid");
        e.target.classList.add('is-invalid');
      }
      else if (id === "id" && !(hkid(normalize(value)) && value.match(validIdForm)))
      {
        this.setState({idValid: false});
        if (!(hkid(normalize(value))))
          this.setState({idError: 'Invalid HKID number.'});
        else
          this.setState({idError: 'Please input your ID Card number in correct format, Example: A123456(7).'});
        e.target.classList.remove("is-valid");
        e.target.classList.add('is-invalid');
      }
      else
      {
        this.setState({[id + "Valid"]: true});
        this.setState({[id + "Error"]: ''});
        e.target.classList.remove("is-invalid");
        e.target.classList.add('is-valid');
      }
    }

    resetform() /*not done*/
    {
      
      window.location.reload(true);
      document.getElementById('Bform').reset();
      this.setState({ 
                       firstValid: false,
                       lastValid: false,
                       phoneValid: false,
                       idValid: false,
                       shopnameValid: false,
                       districtValid: false,
                       firstError: 'Please input this field.',
                       lastError: 'Please input this field.',
                       phoneError: 'Please input this field.',
                       idError: 'Please input this field.',
                       shopnameError: 'Please input this field.',
                       districtError: 'Please select a district.'
                    });

    }

    checkform()
    {
      let first = document.getElementById("first");
      let last = document.getElementById("last");
      let phone = document.getElementById("phone");
      let id = document.getElementById("id");
      let shopname = document.getElementById("shopname");
      let district = document.getElementById("district");
      /* let address = document.getElementById("address"); */
      let allClear = true;


      /* First Name Validation */
      if (this.state.firstValid === false)
      {
        first.classList.remove("is-valid");
        first.classList.add('is-invalid');  
        allClear = false;       
      }

      /* Last Name Validation */
      if (this.state.lastValid === false)
      {
        last.classList.remove("is-valid");
        last.classList.add('is-invalid');  
        allClear = false;       
      }

      /* Phone no. Validation */
      if (this.state.phoneValid === false)
      {
        phone.classList.remove("is-valid");
        phone.classList.add('is-invalid');  
        allClear = false;       
      }

      if (this.state.idValid === false)
      {
        id.classList.remove("is-valid");
        id.classList.add('is-invalid');  
        allClear = false;       
      }

      /* Shop Name Validation */
      if (this.state.shopnameValid === false)
      {
        shopname.classList.remove("is-valid");
        shopname.classList.add('is-invalid');  
        allClear = false;       
      }

      /* District Validation */
      if (this.state.districtValid === false)
      {
        district.classList.remove("is-valid");
        district.classList.add('is-invalid');  
        allClear = false;       
      }

      /* Address Validation */
      /*
      if (this.state.addressValid === false)
      {
        address.classList.remove("is-valid");
        address.classList.add('is-invalid');  
        allClear = false;       
      }*/

      if (allClear)
        alert("Done!");
      return allClear;          
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

    checkRecaptcha = async() => {
      //have to do this in backend, frontend dont allow cors
      try {
        const data = {secret: config["REACT_RECAPTCHA_SECRET_KEY"], response: this.state.token}
        const res = await axios.post(`http://localhost:3001/checkRecaptcha`, data)
        console.log(res.data)
        return res.data
      }
      catch(error){
        console.log(error)
        return false
      }
    }

    submit = async event => {
      if(await this.checkRecaptcha()) {
        console.log("success")
        this.fileUploadHandler(event)
      }
      else {
        console.log("Recaptcha fail")
      }
    }

    render() {
      console.log("testing", process.env.REACT_RECAPTCHA_SITE_KEY)
        return (
            <div>
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>

            <div id="BformArea" className="justify-content-center p-5">
            <form id="Bform">

              <h2 className="fw-normal"><strong>Title</strong></h2>
              <hr className="mb-5" />

              <div className="card" style={{backgroundColor: "#6E5EFE", borderRadius: "6px"}}>
              <div className="card-header text-white">Please provide the following information to us.</div>
              <div className="card-body bg-light">

              <small className="text-secondary">* : Required</small>

              <div className="row mb-4">
                <div className="col-sm-6 col-lg-4">
                  <label htmlFor="first" className="form-label required"><b><small>First Name</small></b></label>
                  <input type="text" id="first" className="form-control form-control-sm shadow-sm" placeholder="Tai Man" onChange={(event) => this.checkbox(event)} />
                  <div className="invalid-feedback" id="first-feedback">{this.state.firstError}</div>
                </div>
                <div className="col-sm-6 col-lg-4">
                 <label htmlFor="last" className="form-label required"><b><small>Last Name</small></b></label>
                  <input type="text" id="last" className="form-control form-control-sm shadow-sm" placeholder="Chan" onChange={(event) => this.checkbox(event)} />
                  <div className="invalid-feedback" id="last-feedback">{this.state.lastError}</div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-5 col-lg-3">
                  <label htmlFor="phone" className="form-label required"><b><small>Business Phone Number</small></b></label>
                  <input type="text" id="phone" className="form-control form-control-sm shadow-sm" placeholder="E.g. 23456781" onChange={(event) => this.checkbox(event)} />
                  <div className="invalid-feedback" id="phone-feedback">{this.state.phoneError}</div>
                </div>
                <div className="col-sm-5 col-lg-2">
                  <label htmlFor="id" className="form-label required"><b><small>HKID Card Number</small></b></label>
                  <input type="text" id="id" className="form-control form-control-sm shadow-sm" placeholder="E.g. A123456(7)" onChange={(event) => this.checkbox(event)} />
                  <div className="invalid-feedback" id="id-feedback">{this.state.idError}</div>
                </div>
              </div>

              <div className="row mb-4">
                <div>
                  <label htmlFor="upload" className="form-label required"><b><small>Upload Business Registration (BR)</small></b></label>
                  <br/>
                  <div className="input-group mb-3">
                  <input type="file" onChange={this.fileSelectedHandler} className="custom-file-input" id="inputGroupFile01"/>
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-lg-8">
                  <label htmlFor="shopname" className="form-label required"><b><small>Restaurant Name</small></b></label>
                  <input type="text" id="shopname" className="form-control form-control-sm shadow-sm" onChange={(event) => this.checkbox(event)} />
                  <div className="invalid-feedback" id="shopname-feedback">{this.state.shopnameError}</div>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-lg-8">
                  <label htmlFor="address" className="form-label required"><b><small>Address</small></b></label>
                  <input type="text" id="address" class="form-control form-control-sm shadow-sm" value={this.state.address} onChange={this.changeAddress}/>
                  <GM setMarker={this.onMarkerComplete}/>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-lg-8">
                  <label htmlFor="district" className="form-label required"><b><small>District</small></b></label>
                  <select className="form-select form-select-sm shadow-sm" id="district" onChange={(event) => this.checkbox(event)}>
                    <option hidden value="">Choose...</option>
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
                  <div className="invalid-feedback" id="district-feedback">{this.state.districtError}</div>
                </div>
              </div>
              
              <div className="row mb-4">
                <div className="col-lg-8">
                  <label htmlFor="description" className="form-label"><b><small>Description (Optional)</small></b></label>
                  <textarea type="text" id="description" className="form-control shadow-sm" style={{height: "100px"}} />
                </div>
              </div>

              <ReCAPTCHA sitekey={config["REACT_RECAPTCHA_SITE_KEY"]} onChange={this.handleRecaptcha}/>
              <div className="row mb-4">
                <div className="d-flex gap-5 justify-content-center">
                  <button type="button" id="reset" className="btn btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right" onClick={this.reset}><b>Reset</b></button>
                  <button type="button" id="upload" onClick={this.submit} className="btn btn-sm shadow-sm float-right" style={{backgroundColor: "#3F5BFF", color: "white"}}><b>Submit</b></button>
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
