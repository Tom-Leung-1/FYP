import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { ReactComponent as OKIcon } from './images/ok.svg';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

class Activate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid : false,
            loading: true,
        };
    }

    componentDidMount = async () => {
        const queryString = window.location.search;
        const token = new URLSearchParams(queryString).get("token");
        if (!token) this.setState({loading : false})
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
                    this.setState({loading : false})
                })
                .catch(error => {
                    console.log(error)
                    this.setState({loading : false})
                })
            }
          })
          .catch(error => {
            console.log(error)
            this.setState({loading : false})
          })
    }

    render() {
        const {valid, loading} = this.state
        return (
            <>
                <Helmet>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                    <title>Activate User Account</title>
                </Helmet>
                {valid ?
                <>
                        <div className="container p-3">
                          <div className="d-flex flex-wrap justify-content-center fs-1 mt-5">
                            <OKIcon style={{height:"200px", width:"200px"}}/>
                          </div>
                          <div className="d-flex flex-wrap justify-content-center fs-1">
                            Successfully Activate the Account
                          </div>
                          <br/>
                          <div className="d-flex flex-wrap justify-content-center fs-4">
                            You can now <Link to="/sign-in" className="text-decoration-none">&nbsp;sign in&nbsp;</Link> to access Foodcreek!
                          </div>
                        </div>
                </>
                :
                loading ?
                <>
                <h1><center className="p-5 text-muted"><span className="spinner-grow"></span><br/>Activating your account...</center></h1>
                </>
                :
                <div className='container p-5'>
                          <Alert severity="error" className='mt-5'>
                            <AlertTitle><b>Error</b></AlertTitle>
                              You are supposed to receive a valid token to activate the account. Please check your email and click the activation link in it.
                              <br/>
                              <Link to="/home" className='text-decoration-none'>&#8592;Back to home page</Link>
                          </Alert>
                        </div>
                
                }
            </>
        );
    }
}

export default Activate;