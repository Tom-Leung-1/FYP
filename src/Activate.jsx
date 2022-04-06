import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';

class Activate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid : false,
        };
    }

    componentDidMount = async () => {
        const queryString = window.location.search;
        const token = new URLSearchParams(queryString).get("token");
        await this.checkValid(token)
    }

    checkValid = async (token) => {
        await axios.get(`http://localhost:3001/activateCheck?token=${token}`)
          .then(async (response) => {
            console.log({response})
            if (response.data.length) {
              const {id} = response.data[0]
              console.log({id})
              await axios.post(`http://localhost:3001/updateValid`, {id})
                .then(response => {
                    console.log({response})
                    this.setState({valid : true})
                })
                .catch(error => {
                    console.log(error)
                })
            }
          })
          .catch(error => {
            console.log(error)
          })
    }

    render() {
        const {valid} = this.state
        return (
            <>
                <Helmet>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                    <title>Activate User Account</title>
                </Helmet>
                {valid ?
                <div>Activated</div>
                :
                <div>Not activated</div>
                }
            </>
        );
    }
}

export default Activate;