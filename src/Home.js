import React, { Component } from 'react';
import {SearchBox} from "./components/SearchBox";
import CustomCarousel from "./Carousel";
import "./Home.css"
import { Helmet } from "react-helmet";

class Home extends React.Component {
    render() {
        return (
            <div className="home">
            
                <SearchBox/>
                <CustomCarousel/>
                <div className="slide">
            
                </div>
            <div class="container test">
            <div class="row">
            <br id="about"/>   
            <section class="p-3 p-md-3 p-lg-3 my-5">	
                <img src="images/1.jpg" alt="landing" class="rounded img-thumbnail"/>
                <h1 class="display-5 fw-normal">About</h1>
                <p class="lead fw-normal">Coming Soon...</p> 
            </section>
            <hr id="feature"/>
            <section class="p-3 p-md-3 p-lg-3 my-5 text-end">	
                <img src="images/1.jpg" alt="landing" class="rounded img-thumbnail" style={{float: "left"}}/>		
                <h1 class="display-5 fw-normal">Features</h1>
                <p class="lead fw-normal">
                Coming Soon...
                </p>
            </section>	
            <hr id="more"/>
            <section class="p-3 p-md-3 p-lg-3 my-5">
                <img src="images/1.jpg" alt="landing" class="rounded img-thumbnail"/>
                <h1 class="display-5 fw-normal">What more</h1>
                <p class="lead fw-normal">
                Coming Soon...
                </p>
            </section>
            </div>
        </div>
            </div>
        )
    }
}


export default Home
