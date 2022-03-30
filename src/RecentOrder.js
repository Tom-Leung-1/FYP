import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { groupBy, eachFirst, getTimeDate } from "./helpers/data"
import axios from 'axios';

const currencyFormatter = new Intl.NumberFormat('zh-HK', {
  style: 'currency',
  currency: 'HKD',
});

const columns = [
  {
    field: 'order_id',
    headerName: 'Order no.',
    width: 100,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'Order date',
    width: 120,
  },
  {
    field: 'time',
    headerName: 'Order time',
    width: 120,
  },
  {
    field: 'restaurant',
    headerName: 'Restaurant Name',
    width: 160,
    sortable: false,
  },
  {
    field: 'type',
    headerName: 'Order Type',
    width: 120,
    filterable: false,
    valueFormatter: ({ value }) => (value === "1" ? "Take Away" : "Delivery"),
  },
  {
    field: 'total',
    headerName: 'Total',
    headerAlign: 'left',
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    width: 120,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 160,
  },
  {
    field: 'detail',
    headerName: '',
    align: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const id = params?.row.id
      return (<strong>
        <small type="button" className="btn btn-link" style={{textDecoration: "none", fontSize: "1em"}} data-bs-toggle="modal" data-bs-target={`#detail${id}`}>&gt; View details</small>
      </strong>)
    }
  },
];

class RecentOrder extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pageSize: 10,
      orders: null,
      ordersSummary: [],
    };
  }

  getUserOrders = async () => {
    const {userId} = this.props
    let data
    await axios.get(`http://localhost:3001/getUserOrders?id=${userId}`)
      .then(response => {
        data = response.data
      })
      .catch(error => {
        console.log(error)
      })
    console.log(data)
    return data
  }

  componentDidMount = async () => {
    const orders = groupBy(await this.getUserOrders(), "order_id")
    const ordersSummary = eachFirst(orders).map(({restaurant, order_id, order_date, type, total, status}) => {
      const [dateObj, time, date] = getTimeDate(order_date)
      // const dateObj = new Date(order_date)
      // dateObj.setUTCHours(dateObj.getUTCHours() + 8);
      // const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
      // const date = `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
      return {"id": order_id, order_id, restaurant, type, total, time, date, dateObj, status}
    }).sort((a, b) => {
      if (a.dateObj < b.dateObj) {
        return 1
      }
      return -1
    })
    console.log({orders, ordersSummary})
    this.setState({orders, ordersSummary})
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };


  showOrderDetail = (orderItems) => (
    orderItems.map((item) => (
      <>
        <span className="fs-5">{item.name}<span style={{float:"right"}}>${item.price}</span></span><br/>
        {item.drink && <><small class="text-muted">+ {item.drink}</small><br/></>}
        {item.special && <><small class="text-muted">+ {item.special}</small><br/></>}
      </>
    ))
  )

  render() {
    const {ordersSummary, orders} = this.state
    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          <title>Recent Orders</title>
        </Helmet>
        <div className="container p-2">

              <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                  <Link to="/ClientOption" className="breadcrumb-item text-decoration-none">Normal Customer</Link>
                  <li className="breadcrumb-item active" aria-current="page">Recent Orders</li>
                </ol>
              </nav>

          <h2 className="fw-normal mt-3"><strong>Recent Orders</strong></h2>
          <hr/>
          <div className="container px-5">
            <div className="row">
              <DataGrid
                rows={ordersSummary}
                columns={columns}
                pageSize={this.state.pageSize}
                onPageSizeChange={this.handlePageSizeChange}
                rowsPerPageOptions={[10, 20, 50]}
                autoHeight
                disableSelectionOnClick
                className="bg-light position-sticky"
                components={{
                  Toolbar: GridToolbar,
                }}
                disableColumnSelector
              />
            </div>
          </div>
        </div>
        {orders && Object.values(orders).map((orderItems) => {
          return (
            <div className="modal fade" id={`detail${orderItems[0]["order_id"]}`} tabindex="-1" aria-labelledby="detail" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="detailLabel">Order Detail</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          {this.showOrderDetail(orderItems)}
                      </div>
                      <div className="modal-footer">
                          <span className="fs-5 fw-bold text-danger mr-auto">Total:</span>
                          <span className="fs-5 fw-bold text-danger mr-auto">${orderItems[0]["total"]}</span>
                      </div>
                  </div>
              </div>
            </div>
          )
        })}
      </>
    );
  }
}

export default RecentOrder
