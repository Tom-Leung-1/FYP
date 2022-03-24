import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import './BookingStatus.css';
import axios from 'axios';
import { getTimeDate } from "./helpers/data"
import { Link } from 'react-router-dom';

const limit = 100;
let now = 30;

class BookingStatus extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pageSize: 10,
      data : [],
      dateStart : null,
      dateEnd : null,
      columns : [
        {
          field: 'id',
          headerName: 'id',
          width: 100,
        },

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
          field: 'phone',
          headerName: 'phone',
          width: 120,
        },
        {
          field: 'progress',
          headerName: 'progress',
          width: 160,
        },
        {
          field: 'action',
          headerName: 'Action',
          sortable: false,
          filterable: false,
          renderCell: (params) => {
            const progress = params?.row.progress.split(" ")[0]
            const done = progress === "cancelled" || progress === "finished"
            const id = params.row.id
            return (
              done ?
              <span></span>
              :
              <strong>
                <button onClick={() => this.updateReservation(id, "finish", "finished")} type="button" title="present" className="btn p-1 mx-2"><i class="fas fa-check"></i></button>
                <button onClick={() => this.updateReservation(id, "cancel", "cancelled by owner")}  type="button" title="absent" className="btn p-1 mx-2"><i class="fas fa-times"></i></button>
              </strong>
            )
          },
        }
      ],
    };
  }

  updateReservation = async (reservationId, confirmString, updateString) => {
    const ok = window.confirm(`Are your sure you would like to ${confirmString} id ${reservationId}?`)
    if (ok) {
      // front end update
      const data = this.state.data.map(datum => {
        const newDatum = {...datum}
        if (newDatum.id === reservationId) {
          newDatum.progress = updateString
        }
        return newDatum
      })
      this.setState({data})
      // back end update
      await axios.post(`http://localhost:3001/updateReservation`, {reservationId, updateString})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        return
      }) 
    }
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
    const data = (await this.getReservations()).map(({date_time, id, ppl, progress, username, phone}) => {
      const [dateObj, time, date] = getTimeDate(date_time)
      // const dateObj = new Date(date_time)
      // dateObj.setUTCHours(dateObj.getUTCHours() + 8);
      // const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
      // const date = `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
      return {dateObj, id, date, time, ppl, progress, username, phone}
    })
    this.setState({data})
  }

  filter = () => {
    const dateString = document.querySelector(`#dateInput`).value
    if (!dateString) {
      alert("Please provide a valid date.")
      return
    }
    const dateStart = new Date(dateString)
    const dateEnd = new Date(dateString)
    dateStart.setHours(0,0,0)
    dateEnd.setHours(23,59,59)
    const timeStartString = document.querySelector(`#timeStart`).value
    const timeEndString = document.querySelector(`#timeEnd`).value
    if (timeStartString) {
      const [startHours, startMinutes] = timeStartString.split(":")
      dateStart.setHours(startHours, startMinutes, 0)
    }
    if (timeEndString) {
      const [endHours, endMinutes] = timeEndString.split(":")
      dateEnd.setHours(endHours, endMinutes, 59)
    }
    this.setState({dateStart, dateEnd})
  }

  reset = () => {
    document.querySelector(`#timeStart`).value = null
    document.querySelector(`#timeEnd`).value = null
    document.querySelector(`#dateInput`).value = null
    this.setState({dateStart : null, dateEnd : null})
  }

  render() {
    const {data, columns, dateStart, dateEnd} = this.state
    const filteredData = dateStart ? data.filter(({dateObj}) => dateStart <= dateObj && dateObj <= dateEnd) : data
    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          <title>Table Reservation</title>
        </Helmet>
        <div style = {{"padding-left": "10%", "padding-right": "10%"}}>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
              <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
              <li className="breadcrumb-item active" aria-current="page">Table Reservation</li>
            </ol>
          </nav>
          <h2 className="fw-normal mt-3"><strong>Table Reservation</strong></h2>
          <hr/>
          <div className="row">
            <div className="col-sm-8">
              <h5 className="fw-normal mt-3"><strong>Reservation List</strong></h5>
              <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={this.state.pageSize}
                onPageSizeChange={this.handlePageSizeChange}
                rowsPerPageOptions={[10, 20, 50]}
                autoHeight
                disableSelectionOnClick
                className="bg-light position-sticky"
              />
            </div>
            <div className="col-sm-4">
              <h5 className="fw-normal mt-3"><strong>Filter by date &#38; time range</strong></h5>
              <label for="date">Date:</label>
              <input id="dateInput" type="date" class="form-control my-2"/>
              <div class="row">
                <div class="col-6">
                  <label for="timeStart">From:</label>
                  <input id="timeStart" type="time" class="form-control my-2"/>
                </div>
                <div class="col-6">
                  <label for="timeEnd">To:</label>
                  <input id="timeEnd" type="time" class="form-control my-2" />
                </div>
                <div>
                  <button onClick={this.filter} className="btn btn-primary col-12 text-uppercase" style={{float: "center"}}>Filter</button>
                  <button onClick={this.reset} className="mt-2 btn btn-primary col-12 text-uppercase" style={{float: "center"}}>Reset</button>
                </div>
                <div style={{"display":"flex", "flex-direction":"row"}}> {/*beauitfy TODO*/}
                  <div>
                    <input id="serveHours" class="form-control my-2"/>
                    <label for="serveHours">hr</label>
                  </div>
                  <div>
                    <input id="serveMinutes" class="form-control my-2"/>
                    <label for="serveMinutes">min</label>
                  </div>
                </div>
              </div>
              <div className="fs-4 mt-5">
                <h5 className="fw-normal"><strong>Booking Quota</strong></h5>
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
