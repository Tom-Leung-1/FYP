import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './BRegister.css';
import axios from "axios"
import config from "./config/config.json"
import TextInput from "./components/Inputs/TextInput"
import AddressInput from "./components/Inputs/AddressInput"
import TextAreaInput from './components/Inputs/TextAreaInput';
import FileInput from './components/Inputs/FileInput';
import hkid from 'validid/esm/hkid.mjs';
import normalize from 'validid/esm/utils/normalize.mjs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

/*@TODO
add a "please provide a valid image file in the BR tab" -> bug (the file chosen does not reflect the state change -> need a better input css)
*/

const key = config["REACT_APP_GOOGLE_KEY"]

class RProfileSetting extends Component {

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
      oldBrSrc: "",
      oldResSrc: "",
      brSrc: "", // image to be showed
      resSrc: "", // image to be showed
      brName: "",
      resName: "",
      brFile: null, // to be uploaded
      resPhoto: null, // to be uploaded
      addressValue: '',
      marker: null,
      map: null,
      firstMarker : true,
      firstCenter: null,
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

  updateForm = async (e) => {
    const {brName, resName, resPhoto, brFile, addressValue, lat, lng } = this.state
    e.preventDefault()
    if (!this.checkForm() || !addressValue.trim()) {
      alert("Please provide the necessary credentials.")
      return
    }
    // if (!brFile) {
    //   alert("Please upload registration file.")
    //   return
    // }
    if (lat === -1 || lng === -1) {
      alert("Please provide the restaurant location by clicking on the google map.")
      return
    }
    // 1 optional upload -> 2 updateCredentials
    const brFileName = brFile ? await this.fileUploadHandler("brFile") : brName
    const photoFilename = resPhoto ? await this.fileUploadHandler("resPhoto") : resName
    await this.updateCredentials(brFileName, photoFilename)
    alert("done")
    this.props.history.push("/rprofile");
  }

  updateCredentials = async (brFileName, photoFilename) => {
    const { restaurantId } = this.props
    const { firstValue, lastValue, phoneValue, idValue, restaurantValue, addressValue, lat, lng, descriptionValue} = this.state
    console.log("tttttt")
    axios.post(`http://localhost:3001/updateRegistration`, { firstValue, lastValue, phoneValue, idValue, restaurantValue, addressValue, brFileName, photoFilename, lat, lng, descriptionValue, restaurantId})
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

  onMarkerComplete = marker => {
    this.state.marker?.setMap(null);
    const lat = marker.position.lat()
    const lng = marker.position.lng()
    console.log(marker, {lat, lng})
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`)
      .then(response => response.json())
      .then(data => this.setState({ firstMarker: false, marker: marker, addressValue: data.results[0].formatted_address, lat, lng }));
  }

  fileSelectedHandler = event => {
    const fileType = event.target.dataset.type
    const {oldBrSrc, oldResSrc,} = this.state
    if (event.target.files.length === 0) {
      this.setState({ [fileType]: null })
      if (fileType === "brFile") {
        this.setState({brSrc : oldBrSrc})
        return 
      }
      this.setState({resSrc : oldResSrc})
      return
    }
    this.setState({ [fileType]: event.target.files[0] })
    if (fileType === "brFile") {
      this.setState({brSrc : URL.createObjectURL(event.target.files[0])})
      return 
    }
    this.setState({resSrc : URL.createObjectURL(event.target.files[0])})
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

  render() {
    const {descriptionValue, brSrc, resSrc, firstValue, lastValue, phoneValue, idValue, restaurantValue, lat, lng, firstMarker, firstCenter} = this.state
    const position = firstMarker ? {lat, lng} : null
    console.log({position})
    return (
      <div>
        <Helmet>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
          <title>Update Restaurant Profile</title>
        </Helmet>
        <div id="RProfileSettingArea" className="justify-content-center container p-3">
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
              <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
              <Link to="/rprofile" className="breadcrumb-item text-decoration-none">Restaurant Profile</Link>
              <li className="breadcrumb-item active" aria-current="page">Update Restaurant Profile</li>
            </ol>
          </nav>
          <form id="RProfileSettingform" onSubmit={this.submitForm}>
            <h2 className="fw-normal"><strong>Update Restaurant Profile</strong></h2>
            <hr className="mb-2" />
            <Alert className="mb-3" severity="info">
              To set the opening hours, please go to <Link to="/bookSetting" className="breadcrumb-item text-decoration-none">Opening Time/Table Reservation Items Setting</Link>
            </Alert>
            <div className="row mb-4">
              <TextInput value={firstValue} sm_md_lg="6_-1_4" id="first" required={true} placeholder="" onChange={this.handleOnChange} name="First Name" errorMsg={this.state.firstCheck} />
              <TextInput value={lastValue} sm_md_lg="6_-1_4" id="last" required={true} placeholder="" onChange={this.handleOnChange} name="Last Name" errorMsg={this.state.lastCheck} />
            </div>
            <div className="row mb-4">
              <TextInput value={phoneValue} sm_md_lg="5_-1_3" id="phone" required={true} placeholder="" onChange={this.handleOnChange} name="Business Phone Number" errorMsg={this.state.phoneCheck} />
              <TextInput value={idValue} sm_md_lg="4_-1_2" id="id" required={true} placeholder="" onChange={this.handleOnChange} name="HKID Card Number" errorMsg={this.state.idCheck} />
            </div>
            <div className="row mb-4">
              <FileInput imgSrc={brSrc} fileType="brFile" accept=".jpg,.png,.jpeg" id="upload" required={true} onChange={this.fileSelectedHandler} name="Business Registration (with jpg, png or jpeg format)" />
            </div>
            <div className="row mb-2">
              <TextInput value={restaurantValue} sm_md_lg="-1_-1_8" id="restaurant" required={true} onChange={this.handleOnChange} name="Restaurant Name" errorMsg={this.state.restaurantCheck} />
            </div>
            <div className="row">
              <FileInput imgSrc={resSrc} fileType="resPhoto" accept=".jpg,.png,.jpeg" id="uploadPhoto" required={true} onChange={this.fileSelectedHandler} name="Photo of restaurant (with jpg, png or jpeg format)" />
            </div>
            <div className="row mb-2">
              <AddressInput firstCenter={firstCenter} position={position} onChange={this.handleOnChange} sm_md_lg="-1_-1_8" id="address" address={this.state.addressValue} required={true} name="Address" onMarkerComplete={this.onMarkerComplete} />
            </div>
            <div className="row mb-4">
              <TextAreaInput value={descriptionValue} onChange={this.handleOnChange} sm_md_lg="-1_-1_8" id="description" name="Description" height="100px" />
            </div>
            <div className="row mb-4">
              <div className="d-flex gap-5 justify-content-center">
                {/*<Link to="/rprofile" type="button" id="back-btn" className="btn btn-secondary btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right"><b>Back</b></Link>*/}
                <button type="button" id="reset-btn" className="btn btn-sm boarder-2 shadow-sm mx-3 border border-1 float-right" onClick={this.resetForm}><b>Reset</b></button>
                <button type="submit" id="upload" onClick={this.updateForm} className="btn btn-sm shadow-sm float-right" style={{ backgroundColor: "#6E5EFE", color: "white" }}><b>Submit</b></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    const {restaurantId} = this.props
    const data = await this.loadData(restaurantId)
    console.log(data)
    const {lat, lng} = data
    this.setState({
      firstValue: data.first_name,
      lastValue: data.last_name,
      phoneValue: data.phone,
      idValue: data.hkid,
      restaurantValue: data.restaurant,
      firstCheck: 'OK',
      lastCheck: 'OK',
      phoneCheck: 'OK',
      idCheck: 'OK',
      restaurantCheck: 'OK',
      addressValue: data.address,
      descriptionValue: data.description,
      lat,
      lng,
      firstCenter : {lat, lng},
      brFile: null,
      oldBrSrc: "images/registration/" + data.br_name,
      oldResSrc: "images/restaurants/" + data.photo,
      brSrc: "images/registration/" + data.br_name,
      resSrc: "images/restaurants/" + data.photo,
      brName: data.br_name,
      resName:data.photo,
    });
  }

  loadData = async (id) => {
    let data
    await axios.get(`http://localhost:3001/getRegData?id=${id}`)
      .then(response => {
        data = response.data[0]
      })
      .catch(error => {
        console.log(error)
    })
    return data
  }
}
export default withRouter(RProfileSetting);
