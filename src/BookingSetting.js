import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BookingSetting extends Component {

    weekdayOpitions = () => {
        var arr = [];
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    
        for (let i = 0; i < 7; i++) {
          arr.push(
              <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                  <label class="form-check-label" for="inlineCheckbox1">{weekday[i].substring(0,3)}</label>
              </div>
          );
        }
    
        return arr;
    }

    render() {
        return (
            <>
            <div className="container p-2">
                <h2 className="fw-normal mt-3"><strong>Reservation Setting</strong></h2>
                <hr/>

                <h5 className="fw-normal mt-3"><strong>Avalible Weekday</strong></h5>
                {this.weekdayOpitions()}
                <h5 className="fw-normal mt-3"><strong>Avalible Time Range</strong></h5>
                <div className="input-group mb-3" style={{width:"20em"}}>
                    <input type="time" className="form-control"/>
                    <span class="input-group-text">to</span>
                    <input type="time" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary" style={{float: "right"}}>Save</button>
            </div>            
            </>
        );
    }
};
export default BookingSetting
