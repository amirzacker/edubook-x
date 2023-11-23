// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
            <Link to="/home"><img src={logo} className="logo" alt="Logo" /></Link>
                <Link to="/home"><div className="title">EduBookX</div></Link>
            </div>   
            <ul className="nav">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart"></Link></li>
            </ul>
        </div>
    );
}

export default Header;
