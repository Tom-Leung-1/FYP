import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import { Helmet } from "react-helmet";
import axios from "axios"

// name, special order, price, order id, drinks, done, restaurantId,
// merge with same order No, -> key dict (value: ordersItem)

class OrderList extends React.Component {

  constructor(props) {
      super(props);
      this.state = { 
        data: {}, 
      };

  }

  componentDidMount = async () => {
    const {restaurantId} = this.props
    const data = await this.getOrders(restaurantId)
    console.log(data)
    this.setState({data})
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
    return this.groupBy(data, "order_id")
  }

  showOrderList = () => {
    const {data} = this.state
    return (
      Object.values(data)?.map(order => {
        const takeAway = order[0].takeaway.data[0]
        const orderId = order[0]["order_id"]
        const total = order[0]["total"]
        return (
          <>
            <div className={`card m-2 ${takeAway ? "border-success" : "border-primary"}`} style={{width: "20em"}}>
                <div className={`card-header fw-bolder text-white ${takeAway ? "bg-success" : "bg-primary"}`}>
                    #{orderId}<button type="button" title="delete" className="btn text-white" style={{float:"right"}}><i class="bi bi-check-square-fill"></i></button>
                    <br/>
                    <span>{takeAway ? "-Take Away-" : "-Delivery-"}</span>
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
                </div>
            </div>
          </>
        )
      })
    )
  }

  render() {
      return (
          <>
            <div className="px-5">
                <h2 className="fw-normal mt-3"><strong>Order</strong></h2>
                <hr/>
                <div className="container pb-3">
                    <div className="d-flex flex-wrap justify-content-left">
                        {this.showOrderList()}
                    </div>     
                </div>
            </div>
          </>
      )
  }
}


export default OrderList
