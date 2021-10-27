import { useNextMonthDisabled } from '@material-ui/lab/internal/pickers/hooks/date-helpers-hooks';
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './ClientOrder.css';
import NumberInput from "./components/Inputs/NumberInput"
import Meal from "./components/MealOrder/Meal"

let Rname = "Horlicks";
let Set1 = {
             "Name": "特別套餐",
             "Type": "Set",
             "Price": 20, 
             "AvalibleTime": "Full Day",
             "MaxOrder": 5
            };
let Order = [{Name: "琉璃冬", Price: 1000000000000}];

class ClientOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                  TakeAway: true,
                  BookingNo: "",
                  Order: [],
                  Total: 0,
                 };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  drinkOpitions() {
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

  TakeAway() {
    let radio = document.getElementsByName("radioTakeAway");
    for (let i = 0; i < radio.length; i++) {
      if(radio[0].checked) {
        this.setState({TakeAway: false});
      } 
    }
    let bookingNo = document.getElementById("bookingNo").value;
    if(bookingNo !== "") this.setState({BookingNo: bookingNo});
  }

  AddMeal(name, price) {

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

  showOrder() {

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
        return (
          <>
          <h4 className="m-3">Restaurnt: <b>{Rname}</b></h4>

<div class="modal fade" id="takeAway" tabindex="-1" aria-labelledby="takeAwayLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <span className="fw-bold">Eat in or take away?</span>
        <form>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radioTakeAway" />
              <label class="form-check-label" for="flexRadioDefault1">
                Eat in
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="radioTakeAway" checked />
              <label class="form-check-label" for="flexRadioDefault1">
                Take away
              </label>
            </div>
        </form>
        <small className="text-muted">*Eat in only for clients who have already make a reservation<br/><br/></small>

        <span className="fw-bold">Reservation number (For eat in only)</span>
        <input type="text" class="form-control mb-3" id="bookingNo"></input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target={`#createOrder${Rname}`} data-bs-dismiss="modal">See Order Detail</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id={`createOrder${Rname}`} tabindex="-1" aria-labelledby={`createOrder${Rname}Label`} aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id={`createOrder${Rname}Label`}>Create Order</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {this.showOrder()}
      </div>
      <div class="modal-footer">
        <h3 class="mr-auto"><b>Total: <span class="text-danger">${this.state.Total}</span></b></h3>
        <button type="button" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}}>Create</button>
      </div>
    </div>
  </div>
</div>



          





          <div className="m-3 COmenu mb-5">

            <div class="d-flex align-items-start">
              <div class="nav flex-column nav-pills me-1 bg-light shadow" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link active justify-content-center" data-bs-toggle="pill" data-bs-target="#Set" type="button" role="tab" aria-controls="Set" aria-selected="true">Set</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Snack</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Dessert</button>
                <button class="nav-link justify-content-center" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Drink</button>
              </div>
            <div class="tab-content col" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="Set" role="tabpanel" aria-labelledby="v-pills-home-tab" >
                
                <div class="card mb-1">                  
                  <div class="card-body">
                    
                    <img src="images/1.jpg" class="rounded img-fiuld mr-3" style={{float:"left", width:120, height:120}}/>		
                    <h3 class="card-title">Set 1</h3>
                    <h5 class="card-text text-danger">$80</h5>
                    <p class="card-text"><small class="text-muted">Avalible Time: Full Day</small></p>
                    
                    <button type="button" class="btn btn-primary btn-sm" style={{float:"right"}} data-bs-toggle="modal" data-bs-target="#mealDetail">Select</button>
                    <div class="modal fade" id="mealDetail" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-body">
                            <button type="button" class="btn-close" style={{float:"right"}} data-bs-dismiss="modal" aria-label="Close"></button>
                            <img src="images/1.jpg" class="my-2" style={{width:"100%", height:300, objectFit:"cover"}}/>
                            <h3>Set 1</h3>
                            <h5 class="text-danger">$80</h5>
                            <p class="card-text"><small class="text-muted">Avalible Time: Full Day</small></p>
                            <NumberInput max="10" id="set1no"/>
                            
                            <form>
                            <h5 class="mb-2 mt-4">Rice</h5>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                More
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                Less
                              </label>
                            </div>
                            </form>

                            <h5 class="mb-2 mt-4">Drink</h5>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                Horlicks(Hot)
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                凍好利時 +$2
                              </label>
                            </div>

                            <h5 class="mb-2 mt-4">Special Order</h5>
                            <textarea id="w3review" name="w3review" class="form-control" rows="4" cols="50"/>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add to Cart</button>
                          </div>
                        </div>
                      </div>
                   </div>
                   
                  </div>
                </div>

                <Meal name={Set1.Name} price={Set1.Price} avalibleTime={Set1.AvalibleTime} maxOrder={Set1.MaxOrder} imgSrc="images/2.jpg" addOnClick={()=>this.AddMeal(Set1.Name, Set1.Price)} />

                <div class="card mb-1">
                  <div class="card-body">
                    <h5 class="card-title">Set 2</h5>
                    <p class="card-text">$120</p>
                    <p class="card-text"><small class="text-muted">Select</small></p>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                
              <div class="card mb-1">
                  <div class="card-body">
                    <h5 class="card-title">Set 2</h5>
                    <p class="card-text">$120</p>
                    <p class="card-text"><small class="text-muted">Select</small></p>
                  </div>
                </div>

              </div>

              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                3...
              </div>

              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                4...
              </div>

            </div>

            </div>


          </div>  

          <div class="d-grid col-12 ml-0 mr-1" style={{position: "fixed", bottom:0}}>
            <button type="button" className="btn btn-primary mb-1" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target="#takeAway">Create Order</button>
          </div>
          </>
        )
    }
}


export default ClientOrder

//<button type="button" className="btn btn-primary mb-1" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target={`#createOrder${Rname}`}>Create Order</button>
