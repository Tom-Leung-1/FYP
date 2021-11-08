import React, { Component } from 'react';
//import {Button} from "./Button";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBox.css";

/*
export const SearchBox = (props) => {
    return (
        <>
        <div className="boxBG d-flex justify-content-center">
        <div className="homeSearch m-5 p-2">
        <div className="input-group bg-light rounded rounded-pill shadow-sm">
          <input type="search" placeholder="Find Restaurant!" aria-describedby="button-addon1" className="form-control rounded rounded-pill border-0 bg-light m-2"/>
          <div className="input-group-append">
            <button id="button-addon1" type="submit" className="btn btn-link rounded rounded-pill m-2"><i className="fa fa-search"></i></button>
          </div>
        </div>
        </div>
        </div>
        </>
        
    );
}
*/

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = { 
                    hover: false
                 };
  }

  handleMouse() {
    if (this.state.hover != true)
        this.setState({hover: true});
    else
        this.setState({hover: false});
  }

  render() {
      return(
        <>
        <div className={`input-group bg-light rounded rounded-pill border ${this.state.hover ? "shadow" : "shadow-sm"}`} onMouseEnter={()=>this.handleMouse()} onMouseLeave={()=>this.handleMouse()}>
          <input type="search" placeholder="Find Restaurant by name here!" aria-describedby="button-addon1" className="form-control rounded rounded-pill border-0 bg-light m-2"/>
          <div className="input-group-append">
            <button id="button-addon1" type="submit" className="btn btn-link rounded rounded-pill m-2"><i className="fa fa-search"></i></button>
          </div>
        </div>
        </>
      )
  }
}

export default SearchBox
