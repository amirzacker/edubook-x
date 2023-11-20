// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img src={logo} className="logo" alt="Logo" />
                <div className="title">EduBookX</div>
            </div>   
            <ul className="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/a-propos">Us</Link></li>
                <li><Link to="/livres">Books</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/panier"></Link></li>
            </ul>
        </div>
    );
}

export default Header;
