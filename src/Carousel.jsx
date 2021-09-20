import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel'; //npm install react-bootstrap bootstrap@4.6.0
import './Carousel.css';

class CutsomCarousel extends Component {
    render() {
        return (
            <>
            <div>
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/1.jpg"
                />
                <Carousel.Caption>
                  <h3>First slide</h3>
                  <p>Testing...</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/2.jpg"
                />
                <Carousel.Caption>
                  <h3>Second slide</h3>
                  <p>Testing...</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/3_crop3.jpg"
                />
                <Carousel.Caption>
                  <h3>Third slide</h3>
                  <p>Testing...</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          </>
        );
    }
};
export default CutsomCarousel
