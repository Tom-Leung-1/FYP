import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class RProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
                       
                     };
    }

    render() {
        return (
            <>
            <Helmet>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
            </Helmet>

            <div id="" className="container p-3">

              <h2 className="fw-normal"><strong>Restaurant Profile</strong></h2>
              <hr className="mb-4" />

              <button type="button" className="btn btn-primary mb-2">Update Profile</button>

              <h5 className="fw-normal"><strong>Owner's Information:</strong></h5>
              <div className="row mb-2">
                <div className="col-sm-5 col-lg-3 mb-2">
                  <label htmlFor="first" className="form-label"><b><small>First Name</small></b></label>
                  <br/>
                  Tai Man
                </div>
                <div className="col-sm-5 col-lg-2">
                 <label htmlFor="last" className="form-label"><b><small>Last Name</small></b></label>
                 <br/>
                  Chan
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-5 col-lg-3 mb-2">
                  <label htmlFor="phone" className="form-label"><b><small>Business Phone Number</small></b></label>
                  <br/>
                  234567481
                </div>
                <div className="col-sm-5 col-lg-2">
                  <label htmlFor="id" className="form-label"><b><small>HKID Card Number</small></b></label>
                  <br/>
                  A123456(3)
                </div>
              </div>

              <h5 className="fw-normal"><strong>Restaurant's Information:</strong></h5>
              <div className="row mb-2">
                <div className="col-sm-5 col-lg-3 mb-2">
                  <label htmlFor="rname" className="form-label"><b><small>Restaurant's Name</small></b></label>
                  <br/>
                  Horlicks
                </div>
                <div className="col-sm-5 col-lg-9">
                 <label htmlFor="address" className="form-label"><b><small>Address</small></b></label>
                 <br/>
                 Shop 888, 8/F, Dragon Centre, 37 Yen Chow Street, Sham Shui Po
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-5 col-lg-3 mb-4">
                  <label htmlFor="hour" className="form-label"><b><small>Open Hours</small></b></label>
                  <br/>
                  Tue-Sun: 5-11pm
                </div>
                <div className="col-sm-10 col-lg-10">
                  <label htmlFor="description" className="form-label"><b><small>Description</small></b></label>
                  <br/>
                  Horlicks pays homage to the great traditions and savoir-faire of French gastronomy, redefining fine dining with a contemporary vision. It is a place where taste is the restaurant’s raison d’être and the ultimate criteria of success. The restaurant serves as one of the few places in the world to possess an unparalleled presence from the gastronomy pioneer.
                  <br/>
                  Horlicks sources produce from the best regions and harvested at their optimal time, highlighting a deep appreciation for nature and an intimate understanding of the seasons. Sourcing from small-scale farms and line-caught fish, the restaurant ensures unparalleled quality and a distinctive tasting experience.
                </div>
              </div>

              
            </div>

            </>


            
            
        );
    }
}
export default RProfile;
