import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecentBooking extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pageSize: 10,
      data : [],
      columns: [
        {
          field: 'id',
          headerName: 'Reservation no.',
          width: 160,
          sortable: false,
        },
        {
          field: 'restaurant',
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
          width: 160
        },
        {
          field: 'cancel',
          headerName: '',
          align: 'center',
          sortable: false,
          filterable: false,
          renderCell: (params) => {
            const id = params?.row.id
            const progress = params?.row.progress.split(" ")[0]
            const done = progress === "cancelled" || progress === "finished"
            return (
              done ? 
              <span></span>
              :
              <strong>
                <small onClick={() => this.updateReservation(id, "cancel", "cancelled by client")} type="button" className="btn btn-sm text-danger" style={{textDecoration: "none", fontSize: "1em"}}>Cancel</small>
              </strong>
            )
          }
        },
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

  componentDidMount = async () => {
    const {userId} = this.props
    let data
    await axios.get(`http://localhost:3001/getUserReservation?id=${userId}`)
    .then(response => {
      data = response.data
    })
    .catch(error => {
      console.log(error)
      return
    })
    const newData = data.map(datum => {
      const dateObj = new Date(datum.date_time)
      dateObj.setHours(dateObj.getHours()+16); //date_time : UTC format -> -8 hrs HKT
      const date = dateObj.toISOString().substring(0,10) // toISOString: to UTC -> -8 hrs again
      const time = dateObj.toISOString().substring(11,19)
      const newDatum = {...datum, date, time}
      return newDatum
    })
    this.setState({data: newData})
  }
  


  render() {
    const {data, columns} = this.state
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
