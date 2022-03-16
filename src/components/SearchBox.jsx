import React, { Component } from 'react';
//import {Button} from "./Button";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBox.css";
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      hover: false,
      searchInput: "",
    };
  }

  handleMouse = () => {
    this.setState({hover : !this.state.hover})
  }

  handleOnClick = () => {
    const {searchInput} = this.state
    this.props.searchUpdate(searchInput)
  }

  handleOnChange = (e) => {
    this.setState({searchInput : e.currentTarget.value})
  }

  handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleOnClick()
      this.props.homePage && this.props.toSearchPage()
    }
  }

  render() {
    const {hover, searchInput} = this.state
      return(
        <>
          <div className={`input-group bg-light rounded rounded-pill border ${hover ? "shadow" : "shadow-sm"}`} onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse}>
            <input onKeyUp={this.handleOnKeyUp} onChange={this.handleOnChange} value={searchInput} type="search" placeholder="Find Restaurant by name here!" aria-describedby="button-addon1" className="form-control rounded rounded-pill border-0 bg-light m-2"/>
            <div className="input-group-append">
              <button id="button-addon1" type="submit" className="btn btn-link rounded rounded-pill m-2" onClick={this.handleOnClick}>
                <Link to="/search"><SearchRoundedIcon sx={{ fontSize: 30, color: "#6E5EFE" }}/></Link>
              </button>
            </div>
          </div>
        </>
      )
  }
}

export default SearchBox
