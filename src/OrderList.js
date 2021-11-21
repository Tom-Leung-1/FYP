import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import { Helmet } from "react-helmet";

// name, special order, price, order id, drinks, done, restaurantId,
// merge with same order No, -> key dict (value: ordersItem)
const data = [
    {
    OrderNo: 123456,
    Order:[
    {Name: "平成卷 x5", Price: 750, Special: ["藍莓獨角獸", ""]},
    {Name: "咸蛋黃薯角 x1", Price: 78, Special: []},
    {Name: "測試1 x1", Price: 12, Special: []},
    {Name: "咸蛋 x1", Price: 45, Special: []},
    {Name: "薯角 x1", Price: 75, Special: ["牛奶",]},
    {Name: "咸蛋測試 x1", Price: 14, Special: []},
    {Name: "測試1薯角 x1", Price: 77, Special: []},
    {Name: "測試1蛋黃 x1", Price: 25, Special: []},
    {Name: "測試2 x1", Price: 19, Special: []},
    {Name: "測試3 x1", Price: 72, Special: []},
    ],
    TakeAway: false,
    Total: 1308,
    },

    {
    OrderNo: 123457,
    Order:[
    {Name: "咸蛋黃薯角 x1", Price: 78, Special: []},
    ],
    TakeAway: true,
    Total: 78,
    },
    {
    OrderNo: 123458,
    Order:[
    {Name: "咸蛋黃薯角 x1", Price: 78, Special: []},
    ],
    TakeAway: false,
    Total: 78,
    },
    {
    OrderNo: 123459,
    Order:[
    {Name: "咸蛋黃薯角 x1", Price: 78, Special: []},
    ],
    TakeAway: false,
    Total: 78,
    },
    
];

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }

    showOrderDetail = (detail) => {

        var arr = [];
    
        for (let i = 1; i <= detail.Order.length; i++) {
          arr.push(
            <><span className="fs-5">{detail.Order[i-1].Name}<span style={{float:"right", display:"none"}}>${detail.Order[i-1].Price}</span></span><br/></>
          );
    
    
          for (let j = 0; j < detail.Order[i-1].Special.length; j++)
            if (detail.Order[i-1].Special[j].length > 0)
              arr.push(
                <><small class="text-muted">+ {detail.Order[i-1].Special[j]}</small><br/></>
              );
    
          //arr.push(<br/>);
        }
    
        return arr;
    
      }

      showOrderList = () => {

          var arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push(
              <>
              <div className={`card m-2 ${data[i].TakeAway ? "border-success" : "border-primary"}`} style={{width: "20em"}}>
                  <div className={`card-header fw-bolder text-white ${data[i].TakeAway ? "bg-success" : "bg-primary"}`}>
                      #{data[i].OrderNo}<button type="button" title="delete" className="btn text-white" style={{float:"right"}}><i class="fas fa-trash"></i></button>
                      <br/>
                      <span>{data[i].TakeAway ? "-Take Away-" : "-Delivery-"}</span>
                  </div>
                  <div className="card-body">
                      {this.showOrderDetail(data[i])}
                      <span className="fs-5 fw-bold text-danger">Total: <span style={{float:"right"}}>${data[i].Total}</span></span>
                  </div>
              </div>
              </>
            );
           }
           return arr;
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
