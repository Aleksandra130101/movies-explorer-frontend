import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation.js';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, onOpenMenu }) {

    const location = useLocation();
    return (

        <header className={`header ${!loggedIn || location.pathname === '/' ? 'header-entrance' : ''}`}>
            <div className='header__container'>
                <Link to='/' className='header__logo'></Link>

                <Navigation loggedIn={loggedIn} onOpenMenu={onOpenMenu}></Navigation>
            </div>
        </header>



    )
}

export default Header;