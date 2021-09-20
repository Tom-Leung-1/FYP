import React, { Component } from 'react';
//import {Button} from "./Button";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBox.css";

export const SearchBox = (props) => {
    return (
        <>
        <div className="boxBG d-flex justify-content-center">
        <div className="homeSearch m-2 p-2">
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
