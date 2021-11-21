import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";

const currencyFormatter = new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency: 'HKD',
  });

const columns = [
  {
    field: 'OrderNo',
    headerName: 'Order no.',
    width: 120,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'Order date',
    type: 'date',
    width: 120
  },
  {
    field: 'name',
    headerName: 'Restaurant Name',
    width: 160,
    sortable: false,
  },
  {
    field: 'TakeAway',
    headerName: 'Order Type',
    width: 120,
    filterable: false,
    valueFormatter: ({ value }) => (value ? "Take Away" : "Delivery"),
  },
  {
    field: 'total',
    headerName: 'Total',
    headerAlign: 'left',
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    width: 120,
  },
  {
    field: 'detail',
    headerName: '',
    align: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <strong>
        <small type="button" className="btn btn-link" style={{textDecoration: "none", fontSize: "1em"}} data-bs-toggle="modal" data-bs-target="#detail">&gt; View details</small>
      </strong>
    )
  },
  {
    field: 'cancel',
    headerName: '',
    align: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <strong>
        <small type="button" className="btn btn-sm text-danger" style={{textDecoration: "none", fontSize: "1em"}}>Cancel</small>
      </strong>
    )
  },
];

const rows = [
  { id: 1, OrderNo: '10000', date: "2021/11/11", name: 'Eliza Pride', TakeAway: true, total: 10.5},
  { id: 2, OrderNo: '15545', date: "2021/11/1", name: 'Golden City', TakeAway: false, total: 10 },
  { id: 3, OrderNo: '13452', date: "2021/10/1", name: 'May My Baby', TakeAway: false, total: 11.2},
  { id: 4, OrderNo: '36754', date: "2021/9/1", name: 'Tony Bin', TakeAway: true, total: 30.5},
  { id: 5, OrderNo: '67856', date: "2021/8/18", name: 'Yes My Lord', TakeAway: false, total: 9.4 },
  { id: 6, OrderNo: '34222', date: "2021/4/1", name: 'Moon Madness', TakeAway: true, total: 11.2 },
  { id: 7, OrderNo: '00001', date: "2021/1/1", name: 'My Big Boy', TakeAway: false, total: 8},
];

const data = [
    {
    OrderNo: 10000,
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

class RecentOrder extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
                    pageSize: 10
                 };
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };


  showOrderDetail = (detail) => {

    var arr = [];

    for (let i = 1; i <= detail.Order.length; i++) {
      arr.push(
        <><span className="fs-5">{detail.Order[i-1].Name}<span style={{float:"right"}}>${detail.Order[i-1].Price}</span></span><br/></>
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

  render() {
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
      </Helmet>
        <div className="container p-2">
        <h2 className="fw-normal mt-3"><strong>Recent Orders</strong></h2>
        <hr/>

        <div className="container px-5">
        <div className="row">
        <DataGrid
          rows={rows}
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
        
        <div className="modal fade" id="detail" tabindex="-1" aria-labelledby="detail" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailLabel">Order Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {this.showOrderDetail(data[0])}
                    </div>
                    <div className="modal-footer">
                        <span className="fs-5 fw-bold text-danger mr-auto">Total:</span>
                        <span className="fs-5 fw-bold text-danger mr-auto">${data[0].Total}</span>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
}

export default RecentOrder
