import React, { Component } from 'react';
import SearchBox from "./components/SearchBox";
import Map from './components/GoogleMap/GoogleMap';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import "./Home.css"
import { Helmet } from "react-helmet";

const data = [
    {pic: "1.jpg", name: "Hayou"},
    {pic: "2.jpg", name: "Harmonic"},
    {pic: "3_.jpg", name: "Hello"},
    {pic: "c_test.jpg", name: "Horlicks"},
];

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: -1 };
    }

	handleMouse(index) {
        if (this.state.selected != index)
			this.setState({selected: index});
		else
			this.setState({selected: -1});
    }

    render() {
        return (
            <>
            <div className="home">
                <div className="boxBG d-flex justify-content-center">
                    <div className="homeSearch p-2">
                        <h2 className="mt-3 mb-5" >Finding your favourite restaurant?<br/>Want to make table reservation or order food?<br/> You can do them all in here!</h2>
                        <SearchBox/>
                    </div>
                </div>

                <div className="container p-3 mt-3">
                    <h1>Find your favourite restaurant through map!</h1>
                    <Map setNameAdress={null}y position={null} markersInfo={null} lat={null} lng ={null} className="boarder"/>
                </div>

                <div className="container p-3">
                    <h1>Selected Restaurant</h1>
                    <div className="d-flex flex-wrap justify-content-center">
                    {
                    data.map((restaurant, index) => (
                        <Link to = "/client" style={{ textDecoration: 'none', color: 'black'}}>
                        <div onMouseOver={()=>this.handleMouse(index)} onMouseOut={()=>this.handleMouse(index)} key={index+1} className="card d-inline-block m-2 shadow" style={{ width:this.state.selected===index ? 270:250 }}>
                            <img src={"/images/"+restaurant.pic} alt=" {restaurant.name}" style={{width: "100%", height: 210, objectFit:"cover"}} />
                            <div className="card-body">
                            <h5 className="card-title fw-bolder">{restaurant.name}</h5>
                            </div>
                        </div>
                        </Link>
                    ))
                    }
                    </div>     
                </div>
                
            </div>
            </>
        )
    }
}


export default Home

/*
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
*/