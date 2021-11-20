import React, { Component } from 'react';
import SearchBox from "./components/SearchBox";
import Map from './components/GoogleMap/GoogleMap';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from "axios"

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
        this.state = {
            selected: -1,
            data: null,
        };
    }

	handleMouse(index) {
        if (this.state.selected != index)
			this.setState({selected: index});
		else
			this.setState({selected: -1});
    }

    toSearchPage = () => {
        this.props.history.push('/search')
    }

    toRestaurantPage = () => {
        this.props.history.push('/client')
    }
    

    render() {
        const {searchUpdate} = this.props
        const {data} = this.state
        return (
            <>
                <div className="home">
                    <div className="boxBG d-flex justify-content-center">
                        <div className="homeSearch p-2">
                            <h2 className="mt-3 mb-5" >Finding your favourite restaurant?<br/>Want to make table reservation or order food?<br/> You can do them all in here!</h2>
                            <SearchBox toSearchPage={this.toSearchPage} homePage={true} searchUpdate={searchUpdate}/>
                        </div>
                    </div>
                    <div className="container p-3 mt-3">
                        <h1>Find your favourite restaurant through map!</h1>
                        <Map toRestaurantPage={this.toRestaurantPage} setNameAdress={null} position={null} markersInfo={data} lat={null} lng ={null} className="boarder"/>
                    </div>
                    <div className="container p-3">
                        <h1>Selected Restaurant</h1>
                        <div className="d-flex flex-wrap justify-content-center">
                            {data?.map(({restaurant, photo}, index) => (
                                <Link to = "/client" style={{ textDecoration: 'none', color: 'black'}}>
                                    <div onMouseOver={()=>this.handleMouse(index)} onMouseOut={()=>this.handleMouse(index)} key={index+1} className="card d-inline-block m-2 shadow" style={{ width:this.state.selected===index ? 270:250 }}>
                                        <img src={photo ? `/images/restaurants/${photo}` : `/images/restaurants/default.png`} alt={`${photo}`} style={{width: "100%", height: 210, objectFit:"cover"}} />
                                        <div className="card-body">
                                        <h5 className="card-title fw-bolder">{restaurant}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>     
                    </div>
                </div>
            </>
        )
    }

    componentDidMount = async () => {
        const data = await this.loadRestaurants()
        this.setState({data})
    }

    loadRestaurants = async () => {
        let data
        await axios.get(`http://localhost:3001/getRestaurants`)
          .then(response => {
            data = response.data
          })
          .catch(error => {
            console.log(error)
        })
        console.log(data)
        return data
    }

}


export default withRouter(Home)