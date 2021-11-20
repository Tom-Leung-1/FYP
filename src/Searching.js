import React, { Component } from 'react';
import SearchBox from "./components/SearchBox";
import Map from './components/GoogleMap/GoogleMap';
import { Link } from 'react-router-dom';
//import CustomCarousel from "./Carousel";
import "./Home.css"
import { Helmet } from "react-helmet";
import axios from "axios"

const data = [
    {pic: "1.jpg", name: "H1"},
    {pic: "1.jpg", name: "H2"},
    {pic: "1.jpg", name: "H3"},
    {pic: "1.jpg", name: "H4"},
    {pic: "1.jpg", name: "H5"},
    {pic: "1.jpg", name: "H6"},
    {pic: "1.jpg", name: "H7"},
    {pic: "1.jpg", name: "H8"},
    {pic: "1.jpg", name: "H9"},
    {pic: "1.jpg", name: "H901"},
    {pic: "1.jpg", name: "H902"},
    {pic: "1.jpg", name: "H903"},
    {pic: "1.jpg", name: "H915"},
    {pic: "1.jpg", name: "H945"},
    {pic: "1.jpg", name: "H956"},
    {pic: "1.jpg", name: "H999"},
    
    {pic: "1.jpg", name: "Hayou"},
    {pic: "2.jpg", name: "Harmonic"},
    {pic: "3_.jpg", name: "Hello"},
    {pic: "c_test.jpg", name: "Horlicks"},
];

class Searching extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            selected: -1,
        };
    }

	handleMouse(index) {
        if (this.state.selected != index)
			this.setState({selected: index});
		else
			this.setState({selected: -1});
    }

    render() {
        const {searchUpdate, searchTag} = this.props
        const {data} = this.state
        return (
            <>
                <div className="searching">
                    <div className="container p-3">
                        <SearchBox searchUpdate={searchUpdate}/>
                    </div>
                    <div className="container px-5 pb-3 text-muted fst-italic">
                        {searchTag && 
                        <> 
                            <span>searching：
                                <span className="fw-bold">{searchTag}</span>
                            </span> 
                            <br/> 
                        </>}
                        result: <span className="fw-bold">{data?.length || 0}</span>
                    </div>
                            

                    <div className="container pb-3">
                        <div className="d-flex flex-wrap justify-content-center">
                        {
                        data?.map(({restaurant, photo}, index) => (
                            <Link to = "/client" style={{ textDecoration: 'none', color: 'black'}}>
                                <div onMouseOver={()=>this.handleMouse(index)} onMouseOut={()=>this.handleMouse(index)} key={index+1} className="card d-inline-block m-2 shadow" style={{ width:this.state.selected===index ? 270:250 }}>
                                    <img src={photo ? `/images/restaurants/${photo}` : `/images/restaurants/default.png`} alt={`${photo}`} style={{width: "100%", height: this.state.selected===index ? 230:210, objectFit:"cover"}} />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bolder">{restaurant}</h5>
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

    componentDidMount = async () => {
        const {searchTag} = this.props
        const data = await this.loadRestaurants(searchTag)
        this.setState({data})
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.searchTag !== prevProps.searchTag) {
            this.setState({data : await this.loadRestaurants(this.props.searchTag)})
        }
    }

    loadRestaurants = async (searchTag) => {
        let data
        await axios.get(`http://localhost:3001/getRestaurants?searchTag=${searchTag}`)
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


export default Searching
