import React, { Component } from 'react';
import {Button} from "./Button";
import "./SearchBox.css";

export const SearchBox = (props) => {
    return (
        <div className ="search-wrapper">
            <label>Find Restaurant!</label>
            <input type="text" placeholder="Search"/>
            <Button>Search</Button>
        </div>
    );
}