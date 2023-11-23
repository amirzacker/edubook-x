// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
            <Link to=""><img src={logo} className="logo" alt="Logo" /></Link>
                <Link to=""><div className="title">EduBookX</div></Link>
            </div>   
            <ul className="nav">
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart"></Link></li>
            </ul>
        </div>
    );
}

export default Header;
