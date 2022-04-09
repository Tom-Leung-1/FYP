import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import Alert from '@mui/material/Alert';
import { ReactComponent as MailIcon } from './images/email.svg';
import axios from "axios"

class activateMail extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 

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
                  <title>Sign up</title>
                </Helmet>

                <div id="test" className="d-flex justify-content-center p-4 mt-5">
                  <div class="flex-shrink">
                  </div>
                <h2 className="text-center mb-4 fw-normal"><MailIcon style={{height:"200px", width:"200px"}}/><br/><strong>We have sent you an activation email. <br/> Please validate the email address to activate the account.</strong></h2>
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    <p className="fs-6">
                      Did not receive the email? Check your spam filter or <Link to="/sign-up" className="btn-link text-decoration-none fs-6">try to sign up again</Link>
                    </p>
                </div>
              </div>
            </>
        );
    }
}
export default withRouter(activateMail);
