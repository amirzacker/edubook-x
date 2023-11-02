import React from 'react';
import './header.css';
import logo from './logo.png';

const Header = () =>{
    return (
    <div className="header">

        <div className="logo-container">
            <img src={logo} className="logo" />
            <div className="title">Edu</div>
        </div>   

        <ul className="nav">
            <li><a href="/">Home</a></li>
            <li><a href="/a-propos">Us</a></li>
            <li><a href="/livres">Books</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </div>
    );
}


export default Header;