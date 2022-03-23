import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import { Helmet } from "react-helmet";
import { groupBy } from "./helpers/data"
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// name, special order, price, order id, drinks, done, restaurantId,
// merge with same order No, -> key dict (value: ordersItem)

class OrderList extends React.Component {

  constructor(props) {
      super(props);
      this.state = { 
        data: {},
        orderReady: true,
        TAopen: false,
        DLopen: false
      };

  }

  componentDidMount = async () => {
    const {restaurantId} = this.props
    const data = await this.getOrders(restaurantId)
    console.log(data)
    this.setState({data})
    if (Object.keys(data).length === 0) this.setState({orderReady: false})
  }

  groupBy = (arr, key) => {
    return arr.reduce((acc, order) => {
      (acc[order[key]] = acc[order[key]] || []).push(order) // 1st: acc.key = acc.key (if present) or [] 2nd: assignment will return the left value 3rd: acc.key.push(..)
      return acc;
    }, {})
  }


  getOrders = async (restaurantId) => {
    let data
    await axios.get(`http://localhost:3001/getOrders?id=${restaurantId}`)
      .then(response => {
        data = response.data
      })
      .catch(error => {
        console.log(error)
      })
    return groupBy(data, "order_id")
  }

  statusOpen = (takeAway) => {
    if (takeAway)
      this.setState({TAopen: true})
    else
      this.setState({DLopen: true})
  }

  statusClose = () => {
    this.setState({TAopen: false})
    this.setState({DLopen: false})
  }



  showOrderList = () => {
    const {data} = this.state
    return (
      Object.values(data)?.map(order => {
        const takeAway = order[0].takeaway.data[0]
        const orderId = order[0]["order_id"]
        const total = order[0]["total"]
        let status = "Preparing the meal"
        return (
          <>
            <div className={`card m-2 ${takeAway ? "border-success" : "border-primary"}`} style={{width: "20em"}}>
                <div className={`card-header fw-bolder text-white ${takeAway ? "bg-success" : "bg-primary"}`}>
                    #{orderId}
                    <button type="button" title="finish" className="btn text-white" style={{float:"right"}}><i class="bi bi-check-square-fill"></i></button>
                    <button type="button" title="change status" className="btn text-white" style={{float:"right"}} onClick={() => this.statusOpen(takeAway)}><i class="bi bi bi-pencil-square"></i></button>
                    <br/>
                    <span>{takeAway ? "-Take Away-" : "-Delivery-"}</span>
                    <br/>
                    <span>Status: <span class="badge rounded-pill bg-warning text-dark">{status}</span></span>
                </div>
                <div className="card-body">
                    {order.map(({name, price, drink, special}) => 
                    <>
                      <span className="fs-5">{name}<span style={{float:"right", display:"none"}}>${price}</span></span><br/>
                      {drink ? <><small class="text-muted">+ {drink}</small><br/></> : null}
                      {special ? <><small class="text-muted">+ {special}</small><br/></> : null}
                    </>
                    )
                    }
                    <span className="fs-5 fw-bold text-danger">Total: <span style={{float:"right"}}>${total}</span></span>
                    <div style={{display: takeAway ? 'none' : 'block'}}>
                    <br/>
                    <span className="fs-6 fw-bold">Phone No.:</span>
                    <br/>
                    22223333
                    <br/>
                    <span className="fs-6 fw-bold">Address:</span>
                    <br/>
                    3248 Round Table Drive, ABC, EFG
                    </div>
                </div>
            </div>
          </>
        )
      })
    )
  }

  render() {
      const {data} = this.state
      return (
          <>
            <div className="container p-3">
                <nav aria-label="breadcrumb" className="mt-3">
                    <ol className="breadcrumb">
                        <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
                        <li className="breadcrumb-item active" aria-current="page">Received Order</li>
                    </ol>
                </nav>
                <h2 className="fw-normal mt-3"><strong>Received Order</strong></h2>
                <hr/>
                <div className="container pb-3">
                    <div className="d-flex flex-wrap justify-content-left">
                        {this.showOrderList()}
                    </div>     
                </div>

                <Dialog open={this.state.TAopen} onClose={() => this.statusClose()}>
                    <DialogTitle>Change status</DialogTitle>
                    <DialogContent>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="TAstatus" id="TApreparing" checked />
                      <label class="form-check-label" for="TApreparing">
                        Preparing the meal
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="TAstatus" id="waiting"/>
                      <label class="form-check-label" for="preparing">
                        Waiting for taking the meal
                      </label>
                    </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.statusClose()} className="text-secondary">Cancel</Button>
                      <Button onClick={() => this.statusClose()} style={{color:"#6E5EFE", fontWeight:"bolder"}}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.DLopen} onClose={() => this.statusClose()}>
                    <DialogTitle>Change status</DialogTitle>
                    <DialogContent>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="DLstatus" id="DLpreparing" checked />
                      <label class="form-check-label" for="DLpreparing">
                        Preparing the meal
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="DLstatus" id="delivering"/>
                      <label class="form-check-label" for="delivering">
                        Delivering the meal
                      </label>
                    </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.statusClose()} className="text-secondary">Cancel</Button>
                      <Button onClick={() => this.statusClose()} style={{color:"#6E5EFE", fontWeight:"bolder"}}>Save</Button>
                    </DialogActions>
                </Dialog>

                <h1><center className="p-5 text-muted" style={{display: this.state.orderReady && Object.keys(data).length <= 0  ? "block" : "none"}}><span className="spinner-grow"></span><br/>Loading...</center></h1>
                
                <div className="container" style={{display: this.state.orderReady ? 'none':'block'}}>
                    <div className="d-flex flex-wrap justify-content-center">
                      <h3 className='text-center'><i class="bi bi-hourglass" style={{color: "lightgrey", fontSize: 100}}></i>
                      <br/>
                      <small>No received order yet, waiting for the new order...</small>
                      </h3>
                    </div>     
                </div>

            </div>
          </>
      )
  }
}


export default OrderList
