import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './BRegister.css';
import ReCAPTCHA from "react-google-recaptcha";
import GM from "./components/GoogleMap/GoogleMap"
import axios from "axios"
import config from "./config/config.json"
import TextInput from "./components/Inputs/TextInput"
import AddressInput from "./components/Inputs/AddressInput"
import TextAreaInput from './components/Inputs/TextAreaInput';
import FileInput from './components/Inputs/FileInput';
import { test } from "./helpers/DBFunctions"
import hkid from 'validid/esm/hkid.mjs';
import normalize from 'validid/esm/utils/normalize.mjs';

/*@TODO
add a "please provide a valid image file in the BR tab" -> bug (the file chosen does not reflect the state change -> need a better input css)
*/

const key = config["REACT_APP_GOOGLE_KEY"]

class BRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstCheck: '',
      lastCheck: '',
      phoneCheck: '',
      idCheck: '',
      restaurantCheck: '',
      selectedFile: null,
      address: null,
      marker: null,
      map: null,
      token: "",
    };
  }

  checkError = (e) => {
    const { id, value } = e.currentTarget;
    const phoneRegex = /^\d{8}$/;
    const idRegex = /^[A-Z0-9]+\(+[A-Z0-9]+\)/;
    if (!value) {
      this.setState({ [id + "Check"]: 'Please input this field.' }); return
    }
    if (id === "phone" && !(value.match(phoneRegex))) {
      this.setState({ phoneCheck: 'Please provide a valid phone number which contains only 8 digits.' }); return
    }
    if (id === "id" && !(hkid(normalize(value)) && value.match(idRegex))) {
      if (!(hkid(normalize(value)))) {
        this.setState({ idCheck: 'Invalid HKID number.' }); return
      }
      this.setState({ idCheck: 'Please input your ID Card number in correct format, Example: A123456(7).' }); return
    }
    this.setState({ [id + "Check"]: 'OK' });
  }

  resetform() /*not done*/ {
    // window.location.reload(true);
    document.getElementById('Bform').reset();
    this.setState({
      firstCheck: '',
      lastCheck: '',
      phoneCheck: '',
      idCheck: '',
      restaurantCheck: '',
      districtError: '',
      selectedFile: null,
    });

  }

  checkform = () => {
    /* let address = document.getElementById("address"); */
    const { firstCheck, lastCheck, phoneCheck, idCheck, restaurantCheck } = this.state
    if (firstCheck + lastCheck + phoneCheck + idCheck + restaurantCheck !== "OKOKOKOKOK") {
      alert("Not Done!");
      return
    }
    alert("Done")
  }

  changeAddress = (event) => {
    this.setState({ address: event.target.value })
  }

  handleRecaptcha = (token) => {
    this.setState({ token })
  }

  onMarkerComplete = marker => {
    this.state.marker?.setMap(null);
    const lat = marker.position.lat()
    const lng = marker.position.lng()
    console.log(marker)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      .then(response => response.json())
      .then(data => this.setState({ marker: marker, address: data.results[0].formatted_address }));
  }

  fileSelectedHandler = event => {
    if (event.target.files.length === 0) {
      this.setState({ selectedFile: null })
      return
    }
    const file = event.target.files[0]
    const fileExtension = file.name.split('.').pop();
    if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
      console.log("No other extension but image!")
      this.setState({ selectedFile: null })
      return
    }
    this.setState({ selectedFile: event.target.files[0] })
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
    }).then(res => {
      console.log(res.statusText)
    }).catch(error => {
      console.log("caught it!", error)
    })
  }

  checkRecaptcha = async () => {
    //have to do this in backend, frontend dont allow cors
    try {
      const data = { secret: config["REACT_RECAPTCHA_SECRET_KEY"], response: this.state.token }
      const res = await axios.post(`http://localhost:3001/checkRecaptcha`, data)
      console.log(res.data)
      return res.data
    }
    catch (error) {
      console.log(error)
      return false
    }
  }

  submit = async event => {
    if (await this.checkRecaptcha()) {
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
            <div className="card" style={{ backgroundColor: "#6E5EFE", borderRadius: "6px" }}>
              <div className="card-header text-white">Please provide the following information to us.</div>
              <div className="card-body bg-light">
                <small className="text-secondary">* : Required</small>
                <div className="row mb-4">
                  <TextInput sm_md_lg="6_-1_4" id="first" required={true} placeholder="Tai Man" onChange={this.checkError} name="First Name" errorMsg={this.state.firstCheck} />
                  <TextInput sm_md_lg="6_-1_4" id="last" required={true} placeholder="Chan" onChange={this.checkError} name="Last Name" errorMsg={this.state.lastCheck} />
                </div>
                <div className="row mb-4">
                  <TextInput sm_md_lg="5_-1_3" id="phone" required={true} placeholder="E.g. 23456781" onChange={this.checkError} name="Business Phone Number" errorMsg={this.state.phoneCheck} />
                  <TextInput sm_md_lg="4_-1_2" id="id" required={true} placeholder="E.g. A123456(7)" onChange={this.checkError} name="HKID Card Number" errorMsg={this.state.idCheck} />
                </div>
                <div className="row mb-4">
                  <FileInput accept=".jpg,.png,.jpeg" id="upload" required={true} onChange={this.fileSelectedHandler} name="Upload Business Registration (with jpg, png or jpeg format)" />
                </div>
                <div className="row mb-2">
                  <TextInput sm_md_lg="-1_-1_8" id="restaurant" required={true} onChange={this.checkError} name="Restaurant Name" errorMsg={this.state.restaurantCheck} />
                </div>
                <div className="row mb-2">
                  <AddressInput sm_md_lg="-1_-1_8" id="address" address={this.state.address} required={true} name="Address" onMarkerComplete={this.onMarkerComplete} />
                </div>
                <div className="row mb-4">
                  <TextAreaInput sm_md_lg="-1_-1_8" id="description" name="Description (Optional)" height="100px" />
                </div>
                <ReCAPTCHA sitekey={config["REACT_RECAPTCHA_SITE_KEY"]} onChange={this.handleRecaptcha} />
                <div className="row mb-4">
                  <div className="d-flex gap-5 justify-content-center">
                    <button type="button" id="reset-btn" className="btn btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right" onClick={this.reset}><b>Reset</b></button>
                    <button type="button" id="upload" onClick={this.checkform} className="btn btn-sm shadow-sm float-right" style={{ backgroundColor: "#3F5BFF", color: "white" }}><b>Submit</b></button>
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
