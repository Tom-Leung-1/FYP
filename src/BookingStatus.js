import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import './BookingStatus.css';
import axios from 'axios';
import { getTimeDate } from "./helpers/data"
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class BookingStatus extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pageSize: 10,
      data : [],
      dateStart : null,
      dateEnd : null,
      dialogOpen: false,
      action: "",
      select: [],
      columns : [
        
        {
          field: 'id',
          headerName: 'ID',
          width: 30,
        },

        { field: 'date', 
          headerName: 'Date', 
          width: 100,
        },
        { field: 'time', 
          headerName: 'Time', 
          width: 70,
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 115,
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
          width: 90,
        },
        {
          field: 'progress',
          headerName: 'progress',
          width: 172,
        },
        {
          field: 'action',
          headerName: 'Action',
          sortable: false,
          filterable: false,
          width: 80,
          renderCell: (params) => {
            const progress = params?.row.progress.split(" ")[0]
            const done = progress === "cancelled" || progress === "finished"
            const id = params.row.id
            //<button onClick={() => this.updateReservation(id, "finish", "finished")} type="button" title="present" className="btn p-1 mx-2"><i class="fas fa-check"></i></button>
            return (
              done ?
              <span></span>
              :
              <strong>
                <button onClick={() => this.dialogOpen("finish", params.row)} type="button" title="present" className="btn p-1 mx-2"><i class="fas fa-check"></i></button>
                <button onClick={() => this.dialogOpen("cancel", params.row)}  type="button" title="absent" className="btn p-1 mx-2"><i class="fas fa-times"></i></button>
              </strong>
            )
          },
        }
      ],
    };
  }

  updateReservation = async (reservationId, updateString) => {
    //const ok = window.confirm(`Are your sure you would like to ${confirmString} id ${reservationId}?`)
    const ok = true
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
    this.dialogClose()
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

  dialogOpen = (actionString, params) => {
    this.setState({dialogOpen: true, action: actionString, select: params})
  }

  dialogClose = () => {
    this.setState({dialogOpen: false, action: "", select: []})
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
        <div style = {{"padding-bottom": "10%", "padding-left": "7%", "padding-right": "7%"}}>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
              <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
              <li className="breadcrumb-item active" aria-current="page">Table Reservation</li>
            </ol>
          </nav>
          <h2 className="fw-normal mt-3"><strong>Table Reservation</strong></h2>
          <hr/>
          <div className="row">
            <div className="col-sm-9">
              <h5 className="fw-normal mt-3"><strong>Reservation List</strong></h5>
              <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={this.state.pageSize}
                onPageSizeChange={this.handlePageSizeChange}
                rowsPerPageOptions={[10, 20, 50]}
                autoHeight
                getRowClassName={(params) => `theme--${params.row.progress[0]}`}
                disableSelectionOnClick
                className="bg-light position-sticky"
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
            <div className="col-sm-3">
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
                <div className='col-12'>
                  <button onClick={this.filter} className="btn btn-primary col-12 text-uppercase fw-bold boarder-2 shadow-sm border border-1" style={{float: "center", backgroundColor:"#6E5EFE"}}>Filter</button>
                </div>
                <div className='col-12 mt-2'>
                <button onClick={this.reset} className="btn btn-light col-12 text-uppercase boarder-2 shadow-sm border border-1" style={{float: "center"}}>Reset</button>
                </div>
              </div>
              {/* <div className="fs-4 mt-5">
                <h5 className="fw-normal"><strong>Booking Quota</strong></h5>
                {now}/{limit}
              </div> */}
            </div>
          </div>
        </div>

        <Dialog fullWidth='true' maxWidth='sm' open={this.state.dialogOpen} onClose={() => this.dialogClose()}>
                <DialogTitle className="text-capitalize">{this.state.action} reservation</DialogTitle>
                <DialogContent>
                <DialogContentText className='text-dark'>
                You are going to <span className='text-uppercase fw-bold'>{this.state.action}</span> the reservation below:
                <br/>
                <div className='my-3 text-secondary'>
                ID: {this.state.select.id}
                <br/>
                Date: {this.state.select.date}
                <br/>
                Time: {this.state.select.time}
                <br/>
                Username: {this.state.select.username}
                <br/>
                No. of people: {this.state.select.ppl}
                <br/>
                Phone no.: {this.state.select.phone}
                <br/>
                </div>
                Are your sure to <span className='text-uppercase fw-bold'>{this.state.action}</span> this rereservation?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.dialogClose()} className="text-secondary">no</Button>
                  <Button onClick={() => this.updateReservation(this.state.select.id, this.state.action === "finish" ? "finished" : "cancelled by restaurant")} style={{color:"#6E5EFE", fontWeight:"bolder"}}>yes</Button>
                </DialogActions>
            </Dialog>

      </>
    );
  }
}

export default BookingStatus
