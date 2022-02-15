import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const columns = [
  {
    field: 'BookingNo',
    headerName: 'Reservation no.',
    width: 160,
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Restaurant Name',
    width: 160,
    sortable: false,
  },
  {
    field: 'date',
    headerName: 'Reservation date',
    type: 'date',
    width: 160
  },
  {
    field: 'time',
    headerName: 'Reservation time',
    type: 'time',
    width: 160
  },
  {
    field: 'nop',
    headerName: 'No. of people',
    type: 'number',
    headerAlign: 'left',
    align: 'center',
    width: 120
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
  { id: 1, BookingNo: '10000', date: "2021/11/11", name: 'Eliza Pride', time:"5:00 pm", nop: 4},
  { id: 2, BookingNo: '15545', date: "2021/11/1", name: 'Golden City',  time:"9:00 pm", nop: 3},
  { id: 3, BookingNo: '13452', date: "2021/10/1", name: 'May My Baby', time:"6:30 pm", nop: 6},
  { id: 4, BookingNo: '36754', date: "2021/9/1", name: 'Tony Bin', time:"3:15 pm", nop: 3},
  { id: 5, BookingNo: '67856', date: "2021/8/18", name: 'Yes My Lord', time:"7:45 pm", nop: 1},
  { id: 6, BookingNo: '34222', date: "2021/4/1", name: 'Moon Madness', time:"9:10 pm", nop: 2},
  { id: 7, BookingNo: '00001', date: "2021/1/1", name: 'My Big Boy', time:"11:00 am", nop: 5},
];
class RecentBooking extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = { 
                      pageSize: 10
                   };
    }

  render() {
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
      </Helmet>
        <div className="container p-2">

              <nav aria-label="breadcrumb" className="mt-3">
                <ol className="breadcrumb">
                  <Link to="/ClientOption" className="breadcrumb-item text-decoration-none">Normal Customer</Link>
                  <li className="breadcrumb-item active" aria-current="page">Recent Reservations</li>
                </ol>
              </nav>

        <h2 className="fw-normal mt-3"><strong>Recent Reservations</strong></h2>
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

      </>
    );
  }
}

export default RecentBooking
