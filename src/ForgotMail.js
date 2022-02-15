import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import Alert from '@mui/material/Alert';
import axios from "axios"

class ForgotMail extends Component {
    
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
                </Helmet>
                <Alert severity="success">
                  We have sent an email with password recover link to your mail box.
                </Alert>

                <div id="test" className="d-flex justify-content-center p-4">
                <h2 className="text-center mb-4 fw-normal"><i class="bi bi-envelope-fill fa-5x" style={{color:"#6E5EFE"}}></i><br/><strong>Check your mail</strong></h2>
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    <p className="fs-6">
                      Did not receive the email? Check your spam filter or <Link to="/forgot" className="btn-link text-decoration-none fs-6">try another email address</Link>
                    </p>
                </div>
              </div>
            </>
        );
    }
}
export default withRouter(ForgotMail);
