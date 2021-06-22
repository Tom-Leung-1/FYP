import React, { Component } from 'react';
import {Button} from "./Button";
import "./SearchBox.css";

export const SearchBox = (props) => {
    return (
        <div className="search-wrapper"> 
            <label>Find Restaurant!</label>
            <div>
            <input type="text" placeholder="Search"/>
            <Button buttonSize="btn-large">Search</Button>
            </div>
        </div>
    );
}