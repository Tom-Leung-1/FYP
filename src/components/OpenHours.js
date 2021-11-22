import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class OpenHours extends Component {

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
        //this.setState({weekday: str});
        if (this.props.end === "")
            this.props.saveOH(str + " " +this.props.start, str, this.props.start, this.props.end);
        else
            this.props.saveOH(str + " " + this.props.start + "-" + this.props.end, str, this.props.start, this.props.end);
            
      }

      TimeChange() {
        let startT = document.getElementById("start").value;
        let endT = document.getElementById("end").value;
        //if (endT !== "" & endT < startT)
        //{
            //alert("End time should larger than start time!");
            //this.setState({start: ""});
            //this.setState({end: ""});
            //this.props.saveOH(this.props.weekday+"", this.props.weekday, "", "");
        //}
        //else
        //{
            //this.setState({start: startT});
            //this.setState({end: endT});
            if (endT === "")
                this.props.saveOH(this.props.weekday + " " + startT, this.props.weekday, startT, endT);
            else
                this.props.saveOH(this.props.weekday + " " + startT + "-" + endT, this.props.weekday, startT, endT);
            
        //}
      }

      checkInput () {
          if (this.state.weekday.length === 0)
          {
              return false
          }
          if (this.state.start.length === 0)
          {
              return false
          }
          if (this.state.end.length === 0)
          {
              return false
          }
          return true
      }

    render() {
        const [sm, md, lg] = this.props.sm_md_lg.split('_')
        return (
            <>
            <div className={`${sm !== "-1" ? `col-sm-${sm}` : ""} ${md !== "-1" ? `col-md-${md}` : ""} ${lg !== "-1" ? `col-lg-${lg}` : ""}`}>
                <label className={`form-label ${this.props.required ? "required" : ""}`} htmlFor={this.props.id}><b><small>{this.props.name}</small></b></label>
                <input type="text" id={this.props.id} value={this.props.value} className="form-control form-control-sm shadow-sm bg-white mb-1" readonly="readonly"/>
                {this.weekdayOpitions()}
                <div className="input-group mb-3" style={{width:"20em"}}>
                    <input type="time" value={this.props.start} className="form-control form-control-sm shadow-sm" id="start" onChange={()=>this.TimeChange()}/>
                    <span class="input-group-text">to</span>
                    <input type="time" value={this.props.end} className="form-control form-control-sm shadow-sm" id="end" onChange={()=>this.TimeChange()}/>
                </div>
            </div>            
            </>
        );
    }
};
export default OpenHours
