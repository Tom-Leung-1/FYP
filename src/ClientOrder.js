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

class ClientOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null,
      withSetData : null,
      TakeAwayErr: "",
      TakeAway: null,
      Order: [],
      Total: 0,
    };
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

  dataFilter = (data, t) => {
    const {withSetData} = this.state
    if (!data) return data
    return data.filter(({type, withSet}) => type === t && !withSet).map(({id, name, type, price, avalibleTime, maxOrder, photo}) =>  // {`images/meals/${photo}`}
    <>
      <MealCard id={id} name={name} price={price} avalibleTime={avalibleTime} maxOrder={maxOrder} imgSrc={`images/meals/${photo}`} addOnClick={()=>this.AddMeal(name, price)}/>
      <MealOverlay id={id} withSetData={withSetData} name={name} price={price} type={type}avalibleTime={avalibleTime} maxOrder={maxOrder} imgSrc={`/images/meals/${photo}`} addOnClick={()=>this.AddMeal(name, price)}/>
    </>)
  }

  componentDidMount = async () => {
    const {restaurantId} = this.props
    const [data, withSetData] = await this.loadData(restaurantId)
    this.setState({data, withSetData})
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

  TakeAway = () => {
    let radio = document.getElementsByName("radioTakeAway");
    for (let i = 0; i < radio.length; i++) {
      if(radio[0].checked) {
        this.setState({TakeAway: false});
        this.setState({TakeAwayErr: ""});
      } 
      if(radio[1].checked) {
        this.setState({TakeAway: true});
        this.setState({TakeAwayErr: ""});
      } 
    }
  }

  CheckTakeAway = () => {
    this.TakeAway();
    if (this.state.TakeAway === null)
        this.setState({TakeAwayErr: "Please choose whether delivery or eat away"}); 
    else
        document.getElementById("detailBtn").click();
  }

  AddMeal = (name, price) => {

    const orderDetail = this.state.Order.slice(0);

    let fName = name + " x" + document.getElementById("noOf" + name).value;

    let fPrice = price * document.getElementById("noOf" + name).value;

    let specialOrder = [];

    let radio = document.getElementsByName("radio" + name);

    for (let i = 0; i < radio.length; i++) {
      if(radio[i].checked) {
        specialOrder.push(radio[i].id);
        fPrice += parseFloat(radio[i].value) * document.getElementById("noOf" + name).value;
      } 
    }

    specialOrder.push(document.getElementById("specialOrder" + name).value);

    orderDetail.push({Name: fName, Price: fPrice, Special: specialOrder});

    this.setState({Order: orderDetail});

    this.setState({Total: this.state.Total + fPrice});

  }

  showOrder = () => {

    var arr = [];

    for (let i = 1; i <= this.state.Order.length; i++) {
      arr.push(
        <h5>{this.state.Order[i-1].Name} <span style={{float:"right"}}>${this.state.Order[i-1].Price}</span></h5>
      );


      for (let j = 0; j < this.state.Order[i-1].Special.length; j++)
        if (this.state.Order[i-1].Special[j].length > 0)
          arr.push(
            <><small class="text-muted">+ {this.state.Order[i-1].Special[j]}</small><br/></>
          );

      arr.push(<br/>);
    }

    return arr;

  }

    render() {
      const {restaurantName, restaurantId} = this.props
      const {data} = this.state
      console.log("hello", {data})
      return (
        <>
          <h4 className="m-3">Restaurnt: <b>{restaurantName}</b></h4>
          <div className="m-3 COmenu mb-5">
            <div class="d-flex align-items-start">
              <div class="nav flex-column nav-pills me-1 bg-light shadow" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link active justify-content-center" data-bs-toggle="pill" data-bs-target="#Set" type="button" role="tab" aria-controls="Set" aria-selected="true">Set</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#Snack" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Snack</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#Dessert" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Dessert</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#Drink" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Drink</button>
              </div>
              <div class="tab-content col" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="Set" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  {this.dataFilter(data, 'Set')}
                </div>
                <div class="tab-pane fade" id="Snack" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                  {this.dataFilter(data, 'Snack')}
                </div>

                <div class="tab-pane fade" id="Dessert" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  {this.dataFilter(data, 'Dessert')}
                </div>

                <div class="tab-pane fade" id="Drink" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  {this.dataFilter(data, 'Drink')}
                </div>
              </div>
            </div>
          </div>  
          <div class="d-grid col-12 ml-0 mr-1" style={{position: "fixed", bottom:0}}>
            <button type="button" className="btn btn-primary mb-1" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target="#takeAway">Create Order</button>
          </div>
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
                      <input class="form-check-input" type="radio" name="radioTakeAway" style={{borderColor: this.state.TakeAwayErr ? "#ff4136" : ""}} onChange={()=>this.TakeAway()}/>
                      <label class="form-check-label" for="flexRadioDefault1">Delivery</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="radioTakeAway" style={{borderColor: this.state.TakeAwayErr ? "#ff4136" : ""}} onChange={()=>this.TakeAway()} />
                      <label class="form-check-label" for="flexRadioDefault1">Take away</label>
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
                <div class="modal-header">
                  <h3 class="modal-title" id={`createOrder${restaurantId}Label`}>Create Order</h3>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h5>{this.state.TakeAway ? "-Take Away-": "-Delivery-"}</h5>
                  <br/>
                  {this.showOrder()}
                </div>
                <div class="modal-footer">
                  <h3 class="mr-auto"><b>Total: <span class="text-danger">${this.state.Total}</span></b></h3>
                  <Link to="/pay" type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}}>Create</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
}
export default ClientOrder
