import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import './BookingStatus.css';
import axios from 'axios';
import { getTimeDate } from "./helpers/data"

const columns = [
  { field: 'date', 
    headerName: 'Date', 
    width: 120,
  },
  { field: 'time', 
    headerName: 'Time', 
    width: 120,
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 120,
    sortable: false
  },
  {
    field: 'ppl',
    headerName: 'No. of people',
    type: 'number',
    headerAlign: 'left',
    align: 'center',
    width: 120
  },
  {
    field: 'progress',
    headerName: 'progress',
    width: 120,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <strong>
        <button type="button" title="accept" className="btn p-1 mx-2"><i class="fas fa-check"></i></button>
        <button type="button" title="reject" className="btn p-1 mx-2"><i class="fas fa-times"></i></button>
      </strong>
    )
  },
];

const rows = [
  { id: 1, date: '01/11/2021', time: '18:00', name: 'Yubi Aid', nop: 1 },
  { id: 2, date: '13/11/2021', time: '18:00', name: 'R2', nop: 8 },
  { id: 3, date: '11/11/2021', time: '21:00', name: 'R3', nop: 2 },
  { id: 4, date: '01/11/2021', time: '21:00', name: 'R5', nop: 2 },
  { id: 5, date: '15/11/2021', time: '22:00', name: 'Fact', nop: 3 },
  { id: 6, date: '19/11/2021', time: '18:00', name: 'Kay Lee', nop: 3 },
  { id: 7, date: '01/11/2021', time: '17:00', name: 'Ben Ben', nop: 3 },
];

const limit = 100;
let now = 30;

class BookingStatus extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pageSize: 10,
      data : [],
    };
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };

  getReservations = async () => {
    const {restaurantId} = this.props
    let data
    await axios.get(`http://localhost:3001/getResReservations?id=${restaurantId}`)
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
    const data = (await this.getReservations()).map(({date_time, id, ppl, progress, username}) => {
      const [dateObj, time, date] = getTimeDate(date_time)
      // const dateObj = new Date(date_time)
      // dateObj.setUTCHours(dateObj.getUTCHours() + 8);
      // const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
      // const date = `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
      return {id, date, time, ppl, progress, username}
    })
    this.setState({data})
  }

  render() {
    const {data} = this.state
    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          <title>Table Reservation</title>
        </Helmet>
          <div className="container p-2">
            <h2 className="fw-normal mt-3"><strong>Table Reservation</strong></h2>
            <hr/>
            <div className="row">
              <div className="col-sm-8">
                <DataGrid
                  rows={data}
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
              <div className="col-sm-4">
                <h5 className="fw-normal mt-3"><strong>Booking Status</strong></h5>
                <input type="date" class="form-control my-2"/>
                <select className="form-select mt-2 mb-4" aria-label="time">
                  <option value="17:00">17:00-18:00</option>
                  <option value="18:00">18:00-19:00</option>
                  <option value="19:00">19:00-20:00</option>
                  <option value="20:00">20:00-21:00</option>
                  <option value="21:00">21:00-22:00</option>
                </select>
                <div className="fs-4">
                  Booking quota:
                  <br/>
                  {now}/{limit}
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
}

export default BookingStatus
