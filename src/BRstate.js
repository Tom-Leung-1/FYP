import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import Alert from '@mui/material/Alert';
import { ReactComponent as WaitingIcon } from './images/waiting.svg';
import { ReactComponent as ErrorIcon } from './images/error.svg';
import axios from "axios"

class BRstate extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
          owner: 0,

        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <>
              <div className="">
                <Helmet>
                  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
                  <title></title>
                </Helmet>
                {this.state.owner === -1 ? 
                <>
                <div id="test" className="d-flex justify-content-center p-4 mt-5">
                  <div class="flex-shrink">
                  </div>
                <h2 className="text-center mb-4 fw-normal"><WaitingIcon style={{height:"200px", width:"200px"}}/><br/><strong>We have receive your registration. <br/> Please wait for the approvement then you can use the functions for restaurant owners.</strong></h2>
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    <p className="fs-6">
                      <Link to="/UserType" className="btn-link text-decoration-none fs-5">Back</Link>
                    </p>
                </div>
                </>
                :
                this.state.owner === 0 ? 
                <>
                <div id="test" className="d-flex justify-content-center p-4 mt-5">
                  <div class="flex-shrink">
                  </div>
                <h2 className="text-center mb-4 fw-normal"><ErrorIcon style={{height:"200px", width:"200px"}}/><br/><br/><strong>Your business registration is declined. <br/> You can do the business registration again by clicking <Link to="/register" className="text-decoration-none">here</Link>.</strong></h2>
                </div>


                <div className="d-flex flex-wrap justify-content-center">
                    <p className="fs-6">
                      <Link to="/UserType" className="btn-link text-decoration-none fs-5">Back</Link>
                    </p>
                </div>
                </>
                :
                <>
                <div>done</div>
                </>
                }
              </div>
            </>
        );
    }
}
export default withRouter(BRstate);
