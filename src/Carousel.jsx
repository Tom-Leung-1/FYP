import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Carousel.css";
import { Carousel } from 'react-responsive-carousel';

class CutsomCarousel extends Component {
    render() {
        return (
            <Carousel >
                <div className = "slide">
                    <img src="images/1.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div className = "slide"> 
                    <img src="images/2.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div className = "slide">
                    <img src="images/3.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};
export default CutsomCarousel