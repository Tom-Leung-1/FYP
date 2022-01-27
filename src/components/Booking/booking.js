import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import axios from "axios";
import { startOfDay } from 'date-fns';

class Booking extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = { 
      noPeople: 2,
      maxPeople: 8,
      dateTime: new Date(),
    };
  }

  validBooking = () => {
    const {openHours} = this.props
    const {dateTime} = this.state
    let [days, time] = openHours.split(" ")
    // days
    const daysOkay = Array(7).fill(false)
    days = days.split(",")
    const daysMap = {
      "Sun" : 0,
      "Mon" : 1,
      "Tue" : 2,
      "Wed" : 3,
      "Thu" : 4,
      "Fri" : 5,
      "Sat" : 6,
    }
    days.forEach(day => {
      // day -> <day> // <day>-<day>
      day = day.split("-")
      if (day.length === 1) {
        daysOkay[daysMap[day[0]]] = true
      }
      else {
        for (let i = daysMap[day[0]]; i <= daysMap[day[1]]; i++) {
          daysOkay[i] = true;
        }
      }
    })
    // time
    const [start, end] = time.split("-")
    // check
    const bookingTime = dateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const bookingDay = dateTime.getDay()
    if (!daysOkay[bookingDay]) return false;
    if (!(start <= bookingTime && bookingTime <= end)) return false
    return true;
  }

  sendBooking = async () => {
    const {noPeople, dateTime} = this.state
    const {userId, clientRestaurantId} = this.props
    if (!this.validBooking()) {
      alert("Please input valid booking time and date based on the opening hours.")
      return
    }
    if (userId == -1) {
      alert("Please login to our system before booking any table reservations.")
      return
    }
    await axios.post(`http://localhost:3001/sendBooking`, {noPeople, dateTime, userId, clientRestaurantId})
    .then(response => {
      console.log(response.data)
      alert("You have successfully booked a table reservation!")
      document.querySelector("#reservation-close-btn").click();
      return
    })
    .catch(error => {
      console.log(error)
      return
    })
  }

  dateChange = (event) => {
    console.log(event)
    const [year, month, day] = event.target.value.split("-").map(str => parseInt(str, 10));
    if (!year) return
    const {dateTime} = this.state
    dateTime.setFullYear(year)
    dateTime.setMonth(month-1)
    dateTime.setDate(day)
    console.log(dateTime)
    this.setState({dateTime});
  }

  timeChange = (event) => {
    // event: date object
    const {dateTime} = this.state
    dateTime.setHours(event.getHours())
    dateTime.setMinutes(event.getMinutes())
    console.log(dateTime)
    this.setState({dateTime})
  }   

  dateForm = (date) => {
    let w = date.toLocaleString('en-us', {weekday: 'short'});
    let y = date.getFullYear();
    let m = date.toLocaleString('en-us', { month: 'short' });
    let d = date.getDate();
    if (d < 10) d = "0" + d;
    return w + ", " + d + " " + m + " " + y;
  }
  

  format12H (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

   
  render() {
    const {restaurantName} = this.props
    const {maxPeople, dateTime, noPeople} = this.state
    return (
      <>
        <p className="fw-bold text-center pt-1">Make a reservation<hr className="mb-0"/></p>
        <div className="mx-5">
          <FormControl variant="standard" sx={{ mb: 1, minWidth: 160 }} className="col-2 mx-4">
            <InputLabel id="noPeople">No. of people</InputLabel>
            <Select
              labelId="noPeople"
              id="noPeople"
              value={noPeople}
              label="No. of people"
              onChange={(evt) => this.setState({noPeople: evt.target.value})}
              defaultValue={2}
            >
              {Array(maxPeople).fill(0).map((_, idx) => <MenuItem value={idx+1}>{idx+1}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl sx={{mb: 1, minWidth: 160 }} className="col-2 mx-4">
            <TextField 
              variant="standard" 
              label="Date" 
              InputLabelProps={{ shrink: true }}
              inputProps= {{
                min: new Date().toISOString().split('T')[0], // date object to yyyy-mm-dd
                onKeyDown: (event) => {event.preventDefault()},
              }}
              type="date"
              onChange={this.dateChange}
              defaultValue={new Date().toISOString().split('T')[0]} />
          </FormControl>

          <FormControl variant="standard" sx={{minWidth: 160 }} className="col-2 mx-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileTimePicker
                renderInput={(params) => <TextField variant="standard" {...params}/>}
                label="Time"
                InputLabelProps={{ shrink: true }}
                value={dateTime}
                onChange={this.timeChange}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl variant="filled" sx={{mt: 1,  minWidth: 160 }} className="col-2 mx-4">
            <button type="button" className="btn btn-primary mb-3" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target="#BookingModal">Book Now</button>
          </FormControl>
          <div class="modal fade" id="BookingModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <button id="reservation-close-btn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style={{lineHeight: 2}}>
                  <p>You are making a reservation for <br/>
                      <b>{noPeople} people</b> at <br/>
                      <b>{restaurantName}</b> on <br/> 
                      <b>{this.dateForm(dateTime)}, {this.format12H(dateTime)}</b>
                      <br/><br/>
                      <b>
                      Restaurant availability and table arrangement are subject to change based on different reasons. 
                      Please contact the restaurant directly with any questions.
                      </b>
                      <br/><br/>
                      <b>
                      Please note that your tables are required to be vacated in 1.5 hours.
                      </b>
                      <br/><br/>
                      Special requests are not guaranteed and are subject to availability and restaurant discretion. 
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                  <button type="sumbit" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}} onClick={this.sendBooking}>Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default Booking
