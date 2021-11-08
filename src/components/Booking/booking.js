import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

var maxnop = 8;
var minH = 17;
var minM = 0;
var maxH = 22;
var maxM = 0;
var s = 60;

class Booking extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = { nop: 2,
                   date: this.currentDate(),
                   time: `${minM < 10 ? `${minH}:0${minM}` : `${minH}:${minM}`}`
                 };
    this.nopChange = this.nopChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
  }
    
   nopOpitions() {
     var arr = [];

     for (let i = 1; i <= maxnop; i++) {
       arr.push(<MenuItem value={i}>{i}</MenuItem>);
     }

     return arr;
   }

   timeOpitions() {
    var arr = [];

    for (let i = minH; i <= maxH; i++) {
      for (let j = minM; j < 60; j+=s) {
        if (i == maxH && j > maxM) break;
        arr.push(<MenuItem value={`${j < 10 ? `${i}:0${j}` : `${i}:${j}`}`}>{i}:{j < 10 ? "0"+j : j}</MenuItem>);
      }
    }

    return arr;
  }

   nopChange(event) {
    const value = event.target.value;
     this.setState({nop: value});
   }

   dateChange(event) {
    const value = event.target.value;
     this.setState({date: value});
   }

   dateForm(da) {
    let date = new Date(da);
    let w = date.toLocaleString('en-us', {weekday: 'short'});
    let y = date.getFullYear();
    let m = date.toLocaleString('en-us', { month: 'short' });
    let d = date.getDate();
    if (d < 10) d = "0" + d;
    return w + ", " + d + " " + m + " " + y;
   }

   timeChange(event) {
    const value = event.target.value;
     this.setState({time: value});
   }

   currentDate() {
     var date = new Date();
     var y = date.getFullYear();
     var m = date.getMonth() + 1;
     if (m < 10) m = "0" + m;
     var d = date.getDate();
     if (d < 10) d = "0" + d;
     return y + "-" + m + "-" + d;
   }

   
    render() {
        const { restaurantName } = this.props
        return (
            <>
            <p className="fw-bold text-center pt-1">Make a reservation<hr className="mb-0"/></p>
            <div className="mx-5">
              <FormControl variant="standard" sx={{ mb: 1, minWidth: 160 }} className="col-2 mx-4">
                <InputLabel id="nop">No. of people</InputLabel>
                <Select
                  labelId="nop"
                  id="nop"
                  value={this.state.nop}
                  label="No. of people"
                  onChange={this.nopChange}
                  defaultValue={2}
                >
                  {this.nopOpitions()}
                </Select>
              </FormControl>

              <FormControl sx={{mb: 1, minWidth: 160 }} className="col-2 mx-4">
                <TextField 
                  variant="standard" 
                  label="Date" 
                  InputLabelProps={{ shrink: true }}
                  InputProps={{inputProps: { min: this.currentDate(), onKeyDown: (event) => {event.preventDefault();}} }}
                  type="date"
                  onChange={this.dateChange}
                  defaultValue={this.currentDate()} />
              </FormControl>

              <FormControl variant="standard" sx={{minWidth: 160 }} className="col-2 mx-4">
                <InputLabel id="time">Time</InputLabel>
                <Select
                  labelId="time"
                  id="time"
                  value={this.state.time}
                  label="No. of people"
                  onChange={this.timeChange}
                  defaultValue={`${minM < 10 ? `${minH}:0${minM}` : `${minH}:${minM}`}`}
                >
                  {this.timeOpitions()}
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{mt: 1,  minWidth: 160 }} className="col-2 mx-4">
                <button type="button" className="btn btn-primary mb-3" style={{backgroundColor:"#6E5EFE"}} data-bs-toggle="modal" data-bs-target="#BookingModal">Book Now</button>
              </FormControl>
              <div class="modal fade" id="BookingModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style={{lineHeight: 2}}>
                      <p>You are making a reservation for <br/>
                         <b>{this.state.nop} people</b> at <br/>
                         <b>{restaurantName}</b> on <br/> 
                         <b>{this.dateForm(this.state.date)}, {this.state.time}</b>
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
                      <button type="sumbit" class="btn btn-primary" style={{backgroundColor:"#6E5EFE"}}>Book Now</button>
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
