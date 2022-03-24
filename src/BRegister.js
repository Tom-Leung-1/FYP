import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './BRegister.css';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios"
import config from "./config/config.json"
import TextInput from "./components/Inputs/TextInput"
import AddressInput from "./components/Inputs/AddressInput"
import TextAreaInput from './components/Inputs/TextAreaInput';
import FileInput from './components/Inputs/FileInput';
import hkid from 'validid/esm/hkid.mjs';
import normalize from 'validid/esm/utils/normalize.mjs';
import { withRouter } from 'react-router';
import OpenHours from './components/OpenHours';

/*@TODO
add a "please provide a valid image file in the BR tab" -> bug (the file chosen does not reflect the state change -> need a better input css)
*/

const key = config["REACT_APP_GOOGLE_KEY"]

class BRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat : -1,
      lng : -1,
      firstCheck: '',
      lastCheck: '',
      phoneCheck: '',
      idCheck: '',
      restaurantCheck: '',
      firstValue: '',
      lastValue: '',
      phoneValue: '',
      idValue: '',
      restaurantValue: '',
      descriptionValue: '',
      brFile: null,
      resPhoto: null,
      addressValue: '',
      marker: null,
      map: null,
      token: "",
      recaptchaKey: 1,
      OpenHours: "",
      OpenWeekdays: "",
      OpenStart: "",
      OpenEnd: "",
      OpenHoursCheck: "",
    };
  }

  handleOnChange = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id + "Value"]: e.currentTarget.value })
    this.checkError(e);
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

  resetForm = () => { //not done
    // window.location.reload(true);
    this.setState({
      firstValue: '',
      lastValue: '',
      phoneValue: '',
      idValue: '',
      restaurantValue: '',
      descriptionValue: '',
      firstCheck: '',
      lastCheck: '',
      phoneCheck: '',
      idCheck: '',
      restaurantCheck: '',
      brFile: null,
      resPhoto: null,
      OpenHours: "",
      OpenWeekdays: "",
      OpenStart: "",
      OpenEnd: "",
      OpenHoursCheck: "",
    });
    //reset checkbox
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    document.querySelector("#uploadPhoto").value = "";
    document.querySelector("#upload").value = "";
    window.scrollTo(0, 0)
  }

  checkForm = () => {
    /* let address = document.getElementById("address"); */
    const { firstCheck, lastCheck, phoneCheck, idCheck, restaurantCheck } = this.state
    return (firstCheck + lastCheck + phoneCheck + idCheck + restaurantCheck === "OKOKOKOKOK")
  }

  submitForm = async (e) => {
    const {resPhoto, brFile, addressValue, lat, lng } = this.state
    e.preventDefault()
    if (!this.state.OpenHoursCheck) {
      alert("Weekday/time range of the open hours is missing.")
      this.setState({ recaptchaKey: this.state.recaptchaKey === 1 ? 2 : 1 })
      return
    }
    if (!await this.checkRecaptcha()) {
      alert("Please click on Recaptcha.")
      this.setState({ recaptchaKey: this.state.recaptchaKey === 1 ? 2 : 1 })
      return
    }
    if (!this.checkForm() || !addressValue.trim()) {
      alert("Please provide the necessary credentials.")
      this.setState({ recaptchaKey: this.state.recaptchaKey === 1 ? 2 : 1 })
      return
    }
    if (!brFile) {
      alert("Please upload registration file.")
      this.setState({ recaptchaKey: this.state.recaptchaKey === 1 ? 2 : 1 })
      return
    }
    if (lat === -1 || lng === -1) {
      alert("Please provide the restaurant location by clicking on the google map.")
      this.setState({ recaptchaKey: this.state.recaptchaKey === 1 ? 2 : 1 })
      return
    }
    const brFileName = await this.fileUploadHandler("brFile")
    const photoFilename = resPhoto ? await this.fileUploadHandler("resPhoto") : ""
    this.uploadCredentials(brFileName, photoFilename)
    alert("done")
    this.props.history.push("/OwnerOption");
  }

  uploadCredentials = (brFileName, photoFilename) => {
    const { userId } = this.props
    const { firstValue, lastValue, phoneValue, idValue, restaurantValue, addressValue, lat, lng, OpenHours, descriptionValue} = this.state
    axios.post(`http://localhost:3001/uploadRegistration`, { firstValue, lastValue, phoneValue, idValue, restaurantValue, addressValue, brFileName, photoFilename, lat, lng, userId, OpenHours, descriptionValue})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
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
    console.log(marker, {lat, lng})
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      .then(response => response.json())
      .then(data => this.setState({ marker: marker, addressValue: data.results[0].formatted_address, lat, lng }));
  }

  fileSelectedHandler = event => {
    const fileType = event.target.dataset.type
    if (event.target.files.length === 0) {
      this.setState({ [fileType]: null })
      return
    }
    this.setState({ [fileType]: event.target.files[0] })
  }

  fileUploadHandler = async (fileType) => {
    const formData = new FormData();
    const imagefile = this.state[fileType];
    formData.append("file", imagefile);
    let filename
    await axios.post(`http://localhost:3001/${fileType === "brFile" ? "uploadReg" : "uploadRes"}`, formData, {
      //headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
      filename = res.data.filename
    }).catch(error => {
      console.log("caught it!", error)
    })
    return filename
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

  saveOH = (data, weekday, start, end) => {
    this.setState({ OpenHours: data, OpenWeekdays: weekday, OpenStart: start, OpenEnd: end}); 

    if (weekday.length === 0)
    {
        this.setState({ OpenHoursCheck: false}); 
    }
    else if (start.length === 0)
    {
        this.setState({ OpenHoursCheck: false}); 
    }
    else if (end.length === 0)
    {
        this.setState({ OpenHoursCheck: false}); 
    }
    else
        this.setState({ OpenHoursCheck: true}); 
  }

  render() {
    console.log("testing", process.env.REACT_RECAPTCHA_SITE_KEY)
    const { descriptionValue, firstValue, lastValue, phoneValue, idValue, restaurantValue, recaptchaKey } = this.state
    return (
      <div>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
        </Helmet>
        <div id="BformArea" className="justify-content-center p-5">
          <form id="Bform" onSubmit={this.submitForm}>
            <h2 className="fw-normal"><strong>Business Registration</strong></h2>
            <hr className="mb-5" />
            <div className="card" style={{ backgroundColor: "#6E5EFE", borderRadius: "6px" }}>
              <div className="card-header text-white">Please provide the following information to us.</div>
              <div className="card-body bg-light">
                <small className="text-secondary">* : Required</small>
                <div className="row mb-4">
                  <TextInput value={firstValue} sm_md_lg="6_-1_4" id="first" required={true} placeholder="Tai Man" onChange={this.handleOnChange} name="First Name" errorMsg={this.state.firstCheck} />
                  <TextInput value={lastValue} sm_md_lg="6_-1_4" id="last" required={true} placeholder="Chan" onChange={this.handleOnChange} name="Last Name" errorMsg={this.state.lastCheck} />
                </div>
                <div className="row mb-4">
                  <TextInput value={phoneValue} sm_md_lg="5_-1_3" id="phone" required={true} placeholder="E.g. 23456781" onChange={this.handleOnChange} name="Business Phone Number" errorMsg={this.state.phoneCheck} />
                  <TextInput value={idValue} sm_md_lg="4_-1_2" id="id" required={true} placeholder="E.g. A123456(7)" onChange={this.handleOnChange} name="HKID Card Number" errorMsg={this.state.idCheck} />
                </div>
                <div className="row mb-4">
                  <FileInput fileType="brFile" accept=".jpg,.png,.jpeg" id="upload" required={true} onChange={this.fileSelectedHandler} name="Upload Business Registration (with jpg, png or jpeg format)" />
                </div>
                <div className="row mb-2">
                  <TextInput value={restaurantValue} sm_md_lg="-1_-1_8" id="restaurant" required={true} onChange={this.handleOnChange} name="Restaurant Name" errorMsg={this.state.restaurantCheck} />
                </div>
                <div className="row">
                  <FileInput fileType="resPhoto" accept=".jpg,.png,.jpeg" id="uploadPhoto" onChange={this.fileSelectedHandler} name="Upload Photo of restaurant (with jpg, png or jpeg format)" />
                </div>
                <div className="row mb-2">
                  <OpenHours name="Open Hours" id="openHours" sm_md_lg="-1_-1_8" value={this.state.OpenHours} saveOH={this.saveOH} weekday={this.state.OpenWeekdays} start={this.state.OpenStart} end={this.state.OpenEnd} required={true} />
                </div>
                <div className="row mb-2">
                  <AddressInput onChange={this.handleOnChange} sm_md_lg="-1_-1_8" id="address" address={this.state.addressValue} required={true} name="Address" onMarkerComplete={this.onMarkerComplete} />
                </div>
                <div className="row mb-4">
                  <TextAreaInput value={descriptionValue} onChange={this.handleOnChange} sm_md_lg="-1_-1_8" id="description" name="Description (Optional)" height="100px" />
                </div>
                <ReCAPTCHA key={recaptchaKey} sitekey={config["REACT_RECAPTCHA_SITE_KEY"]} onChange={this.handleRecaptcha} />
                <div className="row mb-4">
                  <div className="d-flex gap-5 justify-content-center">
                    <button type="button" id="reset-btn" className="btn btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right" onClick={this.resetForm}><b>Reset</b></button>
                    <button type="submit" id="upload" className="btn btn-sm shadow-sm float-right" style={{ backgroundColor: "#3F5BFF", color: "white" }}><b>Submit</b></button>
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
export default withRouter(BRegister);
