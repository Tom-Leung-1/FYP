import { create } from '@mui/material/styles/createTransitions';
import React, { Component } from 'react';
import "./CreateMeal.css"
import axios from 'axios';
class CreateMeal extends Component {
  constructor(props) {
    super(props);
    const {id, name, type, price, avalibleTime, remarks, withSet, photo, inStock} = this.props
    this.state = {
      id: id,
      name: name || "",
      type: type || "",
      price: price || null,
      avalibleTime: avalibleTime || "",
      remarks: remarks || "",
      dbPhotoUrl: photo || null,
      newPhotoUrl: null,
      newPhotoFile: null,
      withSet: (withSet ? 1 : 0),
      inStock: (inStock ? 1 : 0),
    };
  }

  showSelectedImage = (e) => {
    if (e.target.files.length) {
        this.setState({newPhotoFile: e.target.files[0], newPhotoUrl: URL.createObjectURL(e.target.files[0])})
        return
    }
    this.setState({newPhotoFile: null, newPhotoUrl: null})
}

  handleChange = (e) => {
    const field = e.currentTarget.id
    const value = e.currentTarget.value
    if (field === "withSet") {
      this.setState({withSet : e.currentTarget.checked ? 1 : 0})
      return
    }
    //
    if (field === "inStock") {
      this.setState({inStock : e.currentTarget.checked ? 1 : 0})
      return
    }
    //
    this.setState({[field]: value})
  }

  resetField = (e) => {
    const {id, name, type, price, avalibleTime, remarks, withSet} = this.props
    document.querySelector(`#photo${id ? id : ""}`).value = ""
    if (!id) {
      this.setState({
        name: "",
        type: "",
        price: "",
        avalibleTime: "",
        remarks: "",
        withSet: 0,
        inStock: true,
        newPhotoUrl: null,
        newPhotoFile: null,
      })
      return
    }
    this.setState({id, name, type, price, avalibleTime, remarks, withSet, newPhotoUrl: null, newPhotoFile: null,})
  }

  fileUploadHandler = async event => {
    const imagefile = this.state.newPhotoFile;
    if (!imagefile) return null
    console.log(imagefile)
    const formData = new FormData();
    formData.append("file", imagefile);
    let filename
    await axios.post('http://localhost:3001/mealsUpload', formData, {
      //headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
      console.log(res)
      filename = res.data.filename
    }).catch(error => {
      console.log("caught it!", error)
    })
    return filename
  }

  insertNewMeal = async (fileName) => {
    const {name, type, price, avalibleTime, remarks, withSet, inStock} = this.state
    const {restaurantId} = this.props
    await axios.post(`http://localhost:3001/insertMeal`, {restaurantId, name, type, price, avalibleTime, remarks, withSet, fileName, inStock})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
    })
    console.log("new")
  }

  modify = async (fileName) => {
    const {id, name, type, price, avalibleTime, remarks, withSet, inStock} = this.state
    const {restaurantId} = this.props
    await axios.post(`http://localhost:3001/updateMeal`, {id, restaurantId, name, type, price, avalibleTime, remarks, withSet, fileName, inStock})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
    })
    console.log("modify")
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {id} = this.state
    const fileName = await this.fileUploadHandler()
    if(!id) {
      await this.insertNewMeal(fileName);
      document.querySelector(`#close-modal-btn${id ? id : ""}`).click();
    }
    else {
      await this.modify(fileName);
      document.querySelector(`#hidden-btn${id ? id : ""}`).click();
    }
    this.props.reFetchData()
    
  }
  
  render() {
    const {id, name, type, price, avalibleTime, remarks, withSet, newPhotoUrl, dbPhotoUrl, inStock} = this.state
    console.log(withSet)
    return (
      <div class="modal fade" id={id ? `meal${id}` : "newMeal"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg rounded-lg">
          <div class="modal-content bg-light" style={{borderColor: "#6E5EFE" ,border: 8}}>
            <div class="modal-header" style={{background: "linear-gradient(90deg, rgb(110, 94, 254) 0%, rgba(73, 63, 252, 1) 100%)", color: "#FFF", height: 50}}>
              <h5 class="modal-title" id="exampleModalLabel"><strong>{`${id ? "Modify" : "Create"} Meal`}</strong></h5>
              <button style={{display: "none"}} id={`hidden-btn${id ? id : ""}`} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <button id={`close-modal-btn${id ? id : ""}`} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={this.resetField}></button>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div class="modal-body row mealForm">

                <div class="col-md-5 mb-3">
                  <label for="name" class="col-form-label">Name:</label>
                  <input required type="text" class="form-control shadow-sm" id="name" value={name} onChange={this.handleChange}/>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="type" class="col-form-label">Type:</label>
                  <input required type="text" class="form-control shadow-sm" id="type" value={type} onChange={this.handleChange}/>
                </div>
                <div class="col-md-2 mb-3">
                  <label for="price" class="col-form-label">Price:</label>
                  <input required id="price" value={price} type="number" class="form-control shadow-sm" name="price" min="0" step=".1" onChange={this.handleChange}/>
                </div>

                <div class="col-md-4 mb-3">
                  <label for="avalibleTime" class="col-form-label">Avalible Time:</label>
                  <input required type="text" class="form-control shadow-sm" id="avalibleTime" value={avalibleTime} onChange={this.handleChange}/>
                </div>
                
                <div class="col-md-4 mb-3">
                  <label for="status" class="col-form-label">Status:</label>
                  <div class="d-flex my-1"> 
                    <strong class="text-danger fs-5">Sold out</strong>
                    <div class="form-switch mx-2">
                      <input class="form-check-input" type="checkbox" id="inStock" checked={inStock ? true : false} onChange={this.handleChange} style={{width: 50, height: 25}}/>
                    </div>
                    <strong class="text-success fs-5">In stock</strong>
                  </div>
                </div>

                <div class="col-md-2 mb-3">
                  <label for="status" class="col-form-label">with Set?</label>
                  <div class="form-check mt-1">
                    <input class="form-check-input" type="checkbox" id="withSet" style={{width: 25, height: 25}} checked={withSet ? true : false} onChange={this.handleChange}/>
                  </div>
                </div>

                <div class="mb-3" style={{display: "flex", flexDirection: "column"}}>
                  <label for="photo" class="col-form-label">Photo:</label>
                  <div>
                  {newPhotoUrl ? <img src={newPhotoUrl} alt="uploaded image" style={{width: "75%"}}/>
                  :
                  dbPhotoUrl ? <img src={`images/meals/${dbPhotoUrl}`} alt="uploaded image" style={{width: "75%"}}/>
                  :
                  null
                  }  
                  </div>
                  <input class="mt-2" type="file" accept="image/*" id={`photo${id ? id : ""}`} onChange={this.showSelectedImage}/>
                </div>
                <div class="mb-3">
                  <label for="remarks" class="col-form-label">Remarks:</label>
                  <textarea class="form-control shadow-sm" id="remarks" value={remarks} onChange={this.handleChange}></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="sumbit" class="btn btn-primary rounded-pill shadow" style={{backgroundColor: "#6E5EFE", border: 0}}>{`${id ? "Modify" : "Create"}`}</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default CreateMeal;