import { useNextMonthDisabled } from '@material-ui/lab/internal/pickers/hooks/date-helpers-hooks';
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './ClientOrder.css';
import NumberInput from "./components/Inputs/NumberInput"
import Meal from "./components/MealOrder/Meal"
import MealCard from "./components/MealOrder/MealCard"
import MealOverlay from "./components/MealOrder/MealOverlay"
import axios from "axios"
import SelectInput from '@mui/material/Select/SelectInput';
import { Link } from 'react-router-dom';
import { margin } from '@mui/system';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import config from "./config/config.json"
import AddressInput from "./components/Inputs/AddressInput"

const key = config["REACT_APP_GOOGLE_KEY"]

class ClientOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      withSetData : null,
      TakeAwayErr: "",
      TakeAway: null,
      phoneValue: "",
      addressValue: "",
      lat: null,
      lng: null,
      marker: null,
      Order: [],
      Total: 0,
      mealReady: true,
    };
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

  loadData = async (id) => {
    let data
    await axios.get(`http://localhost:3001/getdata?id=${id}`)
      .then(response => {
        data = response.data
      })
      .catch(error => {
        console.log(error)
    })
    console.log(data)
    return [data, data?.filter(({withSet}) => withSet)]
  }

  //Mealcard sold out test
  dataFilter = (data, t) => {
    const {withSetData} = this.state
    if (!data) return data
    return data.filter(({type, withSet}) => type === t && !withSet).map(({id, name, type, price, avalibleTime, maxOrder, photo, in_stock}) =>  // {`images/meals/${photo}`}
    <>
      <MealCard id={id} name={name} price={price} avalibleTime={avalibleTime} onSale={in_stock} imgSrc={`images/meals/${photo}`}/> 
      <MealOverlay id={id} withSetData={withSetData} name={name} price={price} type={type}avalibleTime={avalibleTime} maxOrder={maxOrder} imgSrc={`/images/meals/${photo}`} addOnClick={()=>this.AddMeal(id, name, price)}/>
    </>)
  }

  getDataType = (data) => {
    const typeSet = new Set()
    data?.forEach(({type}) => {
      typeSet.add(type)
    })
    return Array.from(typeSet)
  }

  //get phone no.
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
    const {restaurantId} = this.props
    const [data, withSetData] = await this.loadData(restaurantId)
    this.setState({data, withSetData})
    if (!data) this.setState({mealReady: false})
    const {userId} = this.props
    if (userId > 0)
    {
      const {phone} = await this.getUserProfile()
      this.setState({phoneValue: phone})
    }
  }

  drinkOpitions = () => {
    var arr = [];

    for (let i = 1; i <= 10; i++) {
      arr.push(
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label class="form-check-label" for="flexRadioDefault1">
            Drink{i}
          </label>
        </div>
      );
    }

    return arr;
  }

  handleOnChange = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id + "Value"]: e.currentTarget.value })
    this.setState({TakeAwayErr: ""});
  }

  TakeAway = () => {
    let radio = document.getElementsByName("radioTakeAway");
    if(radio[0].checked) {
      this.setState({TakeAway: false});
      this.setState({TakeAwayErr: ""});
    } 
    if(radio[1].checked) {
      this.setState({TakeAway: true});
      this.setState({TakeAwayErr: ""});
      this.setState({addressValue: "" })
    } 
  }

  CheckTakeAway = () => {
    this.TakeAway();
    if (this.state.TakeAway === null)
        this.setState({TakeAwayErr: "Please choose an option below"}); 
    else if (this.state.phoneValue.length < 8)
    {
      this.setState({TakeAwayErr: "Please provide a valid phone number"});
      if (this.state.addressValue.length < 1 && !this.state.TakeAway)
          this.setState({TakeAwayErr: "Please provide a valid address and a phone number"});
    }
    else if (this.state.addressValue.length < 1)
        if (!this.state.TakeAway)
            this.setState({TakeAwayErr: "Please provide a valid address"});
        else
            document.getElementById("detailBtn").click();
    else
        document.getElementById("detailBtn").click();
  }

  AddMeal = (id, name, price) => {
    
    const totalNumber =  document.getElementById("noOf" + id).value

    const orderDetail = [...this.state.Order];

    const fName = name + " x" + totalNumber;

    const radio = [...document.getElementsByName("radio" + id)]?.filter(btn => btn.checked);

    const [drinkPrice, drink] = radio.length ? [radio[0].value, radio[0].dataset.name + " x" + totalNumber] : [0, ""];

    const fPrice = (price  + parseFloat(drinkPrice)) * totalNumber

    const special = document.getElementById("specialOrder" + id).value;

    orderDetail.push({name: fName, price: fPrice, drink, special});

    this.setState({Order: orderDetail, Total: this.state.Total + fPrice});

  }

  DeleteMeal = (name, price, drink, special) => {
    
    let orderDetail = [...this.state.Order];

    let index = orderDetail.findIndex(meal => meal.name == name && meal.drink == drink && meal.special == special);

    orderDetail.splice(index, 1)

    this.setState({Order: orderDetail, Total: this.state.Total - price});

  }

  showOrder = () => {
    const {Order} = this.state
    return (Order.map(item => {
      return (
        <>
        <h5>
          <b>{item.name} <span style={{float:"right"}}>${item.price}</span></b>
        </h5>
        {item.drink ? <><small class="text-muted">+ {item.drink}</small><br/></> : null}
        {item.special ? <><small class="text-muted">+ {item.special}</small><br/></> : null}
        </>
      )
    }))
  }

  showCart = () => {
    const {Order} = this.state
    if (Order.length > 0)
    return (Order.map(item => {
      return (
        <div className='p-1'>
        <h5>
          <i class="bi bi-trash-fill text-muted" title="delete" type="button" style={{float:"right"}} onClick={() => this.DeleteMeal(item.name, item.price, item.drink, item.special)} ></i>
          <b>{item.name} <span style={{float:"right"}}>${item.price}&nbsp;&nbsp;</span></b>
        </h5>
        {item.drink ? <><small class="text-muted">+ {item.drink}</small><br/></> : null}
        {item.special ? <><small class="text-muted">+ {item.special}</small><br/></> : null}
        </div>
      )
    }))
    else
    return (<h5 className='text-center text-muted'>The Shopping Cart is empty.</h5>)
  }

  toPayment = (Order, Total, TakeAway) => {
    this.props.saveOrder(Order, Total, TakeAway)
    document.getElementById("detailBtn").click();
  }

    render() {
      const {restaurantName, restaurantId} = this.props
      const {Order, Total, TakeAway, data} = this.state
      const typeSet = this.getDataType(data)

      return (
        <>
        <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
        <title>{restaurantName}</title>
        </Helmet>
          <h4 className="m-3">Restaurnt: <b>{restaurantName}</b></h4>
          <div className="m-3 COmenu mb-5">
              <h1><center className="p-5" style={{display: this.state.mealReady ? "none" : "block"}}>Sorry, the menu is not ready.</center></h1>
              <h1><center className="p-5 text-muted" style={{display: this.state.mealReady && typeSet.length <= 0  ? "block" : "none"}}><span className="spinner-grow"></span><br/>Loading...</center></h1>
            <div class="d-flex align-items-start">
              <div class="nav flex-column nav-pills me-1 bg-light shadow" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {typeSet.map((type, idx) => {
                  return idx ?
                  <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target={`#${type}`} type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">{type}</button>
                  :
                  <button class="nav-link active justify-content-center" data-bs-toggle="pill" data-bs-target={`#${type}`} type="button" role="tab" aria-controls="Set" aria-selected="true">{type}</button>
                })}
              </div>
              <div class="tab-content col" id="v-pills-tabContent">
                {typeSet.map((type, idx) => {
                  return idx ?
                  <div class="tab-pane fade" id={type} role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    {this.dataFilter(data, type)}
                  </div>
                  :
                  <div class="tab-pane fade show active" id={type} role="tabpanel" aria-labelledby="v-pills-home-tab">
                    {this.dataFilter(data, type)}
                  </div>
                })}
              </div>
            </div>
          </div>  

          <div class="d-grid col-12" style={{position: "fixed", bottom:2}}>
            <button type="button" className="btn btn-primary mb-2 border-0 shadow enlargeBtn" style={{backgroundColor:"#6E5EFE", marginLeft:"20vw", marginRight:"20vw" }} data-bs-toggle="modal" data-bs-target="#takeAway" disabled={this.state.Order.length > 0 ? false : true}>Create Order</button>
          </div>
          <Tooltip title="Shopping Cart" followCursor>
          <Fab color="secondary" size="medium" style={{position: "fixed", bottom:10, right:10, backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target={`#cart${restaurantId}`} aria-label="edit">
            <i class="bi bi-cart-fill fs-5"></i>
            <span class="position-absolute translate-middle bg-danger rounded-circle" style={{left: 41, top:7, padding:6, display: this.state.Order.length > 0 ? "block" : "none"}}>
              <span class="visually-hidden">New alerts</span>
            </span>
          </Fab>
          </Tooltip>

          <div class="modal fade" id="takeAway" tabindex="-1" aria-labelledby="takeAwayLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <span className="fw-bold">Delivery or take away?</span>
                  <br/>
                  <small className="text-danger fw-bolder"><i class="bi bi-exclamation-triangle" style={{display: this.state.TakeAwayErr ? "inline" : "none"}}></i> {this.state.TakeAwayErr}</small>
                  <form>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="radioTakeAway" style={{borderColor: this.state.TakeAwayErr==="Please choose an option below" ? "#ff4136" : ""}} onChange={()=>this.TakeAway()}/>
                      <label class="form-check-label" for="flexRadioDefault1">Delivery</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="radioTakeAway" style={{borderColor: this.state.TakeAwayErr==="Please choose an option below" ? "#ff4136" : ""}} onChange={()=>this.TakeAway()} />
                      <label class="form-check-label" for="flexRadioDefault1">Take away</label>
                    </div>
                    
                    <div>
                      <br/>
                      <span className="fw-bold">Information for order:</span>
                      <br/>
                      <label for="phone" class="col-form-label">Phone No.: </label>
                      <input value={this.state.phoneValue} id="phone" className="form-control form-control-sm mb-1" onChange={this.handleOnChange}/>
                      <div style={{display: this.state.TakeAway === false ? "block" : "none"}}>                        
                          <AddressInput onChange={this.handleOnChange} sm_md_lg="-1_-1_8" id="address" address={this.state.addressValue} required={true} name="Address" onMarkerComplete={this.onMarkerComplete} />
                        {/* <textarea value={this.state.addressValue} id="address" className="form-control form-control-sm mb-1" onChange={this.handleOnChange}/> */}
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}} onClick={()=>this.CheckTakeAway()}>See Order Detail</button>
                <button type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE", display: "none"}} data-bs-toggle="modal" data-bs-target={`#createOrder${restaurantId}`} data-bs-dismiss="modal" id="detailBtn">See Order Detail</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id={`createOrder${restaurantId}`} tabindex="-1" aria-labelledby={`createOrder${restaurantId}Label`} aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header" style={{background: "linear-gradient(90deg, rgb(110, 94, 254) 0%, rgba(73, 63, 252, 1) 100%)", color: "#FFF"}}>
                  <h3 class="modal-title" id={`createOrder${restaurantId}Label`}><strong>Create Order</strong></h3>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h5>{this.state.TakeAway ? "-Take Away-": "-Delivery-"}</h5>
                  <h5>Phone No.: {this.state.phoneValue}</h5>
                  <h5 style={{display: this.state.TakeAway ? "none" : "block"}}>Address: {this.state.addressValue}</h5>
                  <br/>
                  {this.showOrder()}
                </div>
                <div class="modal-footer">
                  <h3 class="mr-auto"><b>Total: <span class="text-danger">${this.state.Total}</span></b></h3>
                  <Link onClick={() => this.toPayment(Order, Total, TakeAway)} to="/pay" type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}}>Create</Link>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade right" id={`cart${restaurantId}`} tabindex="-1" aria-labelledby={`cart${restaurantId}Label`} aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-side modal-top-right">
              <div class="modal-content">
                <div class="modal-header" style={{background: "linear-gradient(90deg, rgb(110, 94, 254) 0%, rgba(73, 63, 252, 1) 100%)", color: "#FFF", height: 50}}>
                  <h5 class="modal-title" id={`cart${restaurantId}Label`}><strong>Shopping Cart</strong></h5>
                  <button type="button" class="btn-close btn-close-white btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {this.showCart()}
                </div>
                <div class="modal-footer">
                  <h3 class="mr-auto"><b>Total: <span class="text-danger">${this.state.Total}</span></b></h3>
                </div>
              </div>
            </div>
          </div>

        </>
      )
    }
}
export default ClientOrder
