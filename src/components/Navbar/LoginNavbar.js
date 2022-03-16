import React, { Component } from 'react';
import {MenuItems} from "./LNavItems";
import { Link } from 'react-router-dom';
import './NewNavbar.css';
import SetMealRoundedIcon from '@mui/icons-material/SetMealRounded';

class LoginNavbar extends Component {
    
    navbarShadow() {
        let nav;
        if (document.getElementById("LoginNav") === null) return;
        else
          nav = document.getElementById("LoginNav");
        if (window.scrollY > 2)
          nav.classList.add("shadow");
        else
          nav.classList.remove("shadow");
    }

    componentDidMount() {
        window.addEventListener('scroll', this.navbarShadow)
    }

    render() {
        return(
            <>
            <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark HomeNav" id="LoginNav">
              <div className="container-fluid">
                <Link to = "/" className='text-decoration-none'><div className="navbar-brand mx-1"><SetMealRoundedIcon style={{fontSize: 40}}/> Foodcreek</div></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#LoginNavMenu" aria-controls="LoginNavMenu" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="LoginNavMenu">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {MenuItems.map((item, index)=> {
                      return (
                        <li key={index} className="nav-item text-center mx-2"> 
                          <Link to = {item.url} className={item.cName}>
                              {item.title}
                          </Link>
                        </li>
                      )
                    })}
                    <li className="nav-item text-center mx-2"> 
                          <Link to = "/home" className='nav-link' onClick={()=>{this.props.signOut(-1)}}>
                              Sign Out
                          </Link>
                    </li>
                  </ul>

                </div>

              </div>

            </nav>
            </header>
            </>
        )
    }
}

export default LoginNavbar