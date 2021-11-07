import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import './BookingStatus.css';

const columns = [
  {
    field: 'table',
    headerName: 'Table',
    width: 120,
    sortable: false
  },
  {
    field: 'limit',
    headerName: 'People limit',
    type: 'number',
    headerAlign: 'left',
    align: 'center',
    width: 120
  },
  {
    field: 'name',
    headerName: 'Booking Name',
    width: 160,
    sortable: false,
  },
  {
    field: 'nop',
    headerName: 'No. of People',
    type: 'number',
    headerAlign: 'left',
    align: 'center',
    width: 120,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    align: 'center',
    width: 120,
    cellClassName: (params) => {
      if (params.value === "Seated") return "bg-primary text-white";
      else if (params.value === "Free") return "bg-success text-white";
      else if (params.value === "Wait") return "bg-warning";
      else if (params.value === "Not Available") return "bg-danger text-white";
    }
  },
  {
    field: 'action',
    headerName: 'Action',
    align: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <strong>
        <button type="button" title="edit" className="btn p-1 mx-2"><i class="fas fa-edit"></i></button>
      </strong>
    )
  },
];

const rows = [
  { id: 1, table: 'TBL-1', limit: 10, status:"Wait", name: 'AA', nop: 10},
  { id: 2, table: 'TBL-2', limit: 10, status:"Seated", name: 'Walk-in', nop: 9 },
  { id: 3, table: 'TBL-3', limit: 4, status:"Free" },
  { id: 4, table: 'TBL-4', limit: 4, status:"Free" },
  { id: 5, table: 'TBL-5', limit: 8, status:"Seated", name: 'GG', nop: 8 },
  { id: 6, table: 'TBL-6', limit: 8, status:"Seated", name: 'dsfsdf', nop: 6 },
  { id: 7, table: 'TBL-7', limit: 2, status:"Not Available" },
];

class TableStatus extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
                    pageSize: 10
                 };
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };

  render() {
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <title>Table Status</title>
      </Helmet>
        <div className="container p-2">
        <h2 className="fw-normal mt-3"><strong>Table Status</strong></h2>
        <hr/>

        <div className="container px-5">
        <div className="row m-4">
        <input type="date" class="form-control col mx-2"/>
        <select className="form-select col" aria-label="time">
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
        </select>
        </div>
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
        />
        </div>
        </div>
        </div>
      </>
    );
  }
}

export default TableStatus
