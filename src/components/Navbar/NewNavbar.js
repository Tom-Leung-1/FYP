import React, { Component } from 'react';
import {MenuItems} from "./MenuItems";
import { Link } from 'react-router-dom';
import SetMealRoundedIcon from '@mui/icons-material/SetMealRounded';
import './NewNavbar.css';

class Navbar extends Component {
    
    navbarShadow() {
        let nav;
        if (document.getElementById("HomeNav") === null) return;
        else
          nav = document.getElementById("HomeNav");
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
            <nav className="navbar navbar-expand-lg navbar-dark HomeNav" id="HomeNav">
              <div className="container-fluid">
                <Link to = "/" className='text-decoration-none'><div className="navbar-brand mx-1"><SetMealRoundedIcon style={{fontSize: 40}}/> Foodcreek</div></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#HomeNavMenu" aria-controls="HomeNavMenu" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="HomeNavMenu">
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
                  </ul>

                </div>

              </div>

            </nav>
            </header>
            </>
        )
    }
}

export default Navbar