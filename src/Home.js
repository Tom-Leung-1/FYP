import React, { Component } from 'react';
import {SearchBox} from "./components/SearchBox";
import Carousel from "./Carousel";
import "./Home.css"
class Home extends React.Component {
    render() {
        return (
            <div>
                <SearchBox/>
                <div className="slide">
                    <img src="images/3_crop3.jpg" />
                </div>
            </div>
        )
    }
}


export default Home