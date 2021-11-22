import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';

class BookingSetting extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                        weekday: "",
                        start: "",
                        end: "",
                        all: "",
                     };
      }

    weekdayOpitions = () => {
        var arr = [];
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    
        for (let i = 0; i < 7; i++) {
          arr.push(
              <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="checkbox" name="weekday" value={weekday[i].substring(0,3)} onClick={()=>this.weekdayStr()} />
                  <label class="form-check-label" for="checkbox">{weekday[i].substring(0,3)}</label>
              </div>
          );
        }
    
        return arr;
    }

    weekdayStr = () => {
        let weekday = document.getElementsByName("weekday");
        let str = "";
        for (let i = 0; i < weekday.length; i++) {
            if (weekday[i].checked) 
            {
                let j = i;
                while (weekday[j].checked)
                {
                    j++;
                    if (j >= 7) break;
                }
                if (j !== i+1)
                {
                    str += weekday[i].value + "-" + weekday[j-1].value + ",";
                    i = j-1;
                }
                    
                else
                   str += weekday[i].value + ",";
                
            }

        }
        str = str.slice(0,-1);
        this.setState({weekday: str});
        if (this.state.end === "")
            this.setState({all: str + " " +this.state.start});
        else
            this.setState({all: str + " " + this.state.start + "-" + this.state.end});
            
      }

      TimeChange() {
        let startT = document.getElementById("start").value;
        let endT = document.getElementById("end").value;
        if (endT !== "" & endT < startT)
        {
            alert("End time should larger than start time!");
            this.setState({start: ""});
            this.setState({end: ""});
        }
        else
        {
            this.setState({start: startT});
            this.setState({end: endT});
            if (endT === "")
                this.setState({all: this.state.weekday + " " + startT});
            else
                this.setState({all: this.state.weekday + " " + startT + "-" + endT});
            
        }
      }

      checkInput () {
          if (this.state.weekday.length === 0)
          {
              alert("Please choose at least one avalible weekaday!");
              return
          }
          if (this.state.start.length === 0)
          {
              alert("Please input the start time of the avalible time range!");
              return
          }
          if (this.state.end.length === 0)
          {
              alert("Please input the end time of the avalible time range!");
              return
          }
          alert("OK");
          this.props.history.push("/OwnerOption");

      }

    render() {
        return (
            <>
            <div className="container p-2">
                <h2 className="fw-normal mt-3"><strong>Reservation Setting</strong></h2>
                <hr/>
                {this.state.all}
                <br/>

                <h5 className="fw-normal mt-3"><strong>Avalible Weekday</strong></h5>
                {this.weekdayOpitions()}
                <h5 className="fw-normal mt-3"><strong>Avalible Time Range</strong></h5>
                <div className="input-group mb-3" style={{width:"20em"}}>
                    <input type="time" value={this.state.start} className="form-control" id="start" onChange={()=>this.TimeChange()}/>
                    <span class="input-group-text">to</span>
                    <input type="time" value={this.state.end} className="form-control" id="end" onChange={()=>this.TimeChange()}/>
                </div>
                <button type="submit" className="btn btn-primary" style={{float: "right"}} onClick={()=>this.checkInput()}>Save</button>
            </div>      
            </>
        );
    }
};
export default withRouter(BookingSetting)
