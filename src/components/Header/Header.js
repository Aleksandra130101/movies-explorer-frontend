import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation.js';
import { Routes, Route } from 'react-router-dom';

function Header({ loggedIn, onOpenMenu }) {
    return (

        <header className={`header ${!loggedIn ? 'header_entrance' : ''}`}>
            <div className='header__container'>
                <button className='header__logo'></button>

                <Navigation loggedIn={loggedIn} onOpenMenu={onOpenMenu}></Navigation>
            </div>
        </header>



    )
}

export default Header;