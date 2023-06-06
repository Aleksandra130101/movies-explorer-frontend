import React from 'react';
import './Navigation.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import accaunt from '../../images/accaunt.svg';

function Navigation({ loggedIn, onOpenMenu }) {

    const navigate = useNavigate();

    return (
        loggedIn
            ? (
                <>
                    <div className='navbar navbar_main'>
                        <div className='navbar__movies'>

                            <NavLink to="/movies" className={({ isActive }) => isActive ?
                                "navbar__link navbar__link_movies navbar__link_movies-active" : "navbar__link navbar__link_movies"
                            }>Фильмы</NavLink>

                            <NavLink to="/saved-movies" className={({ isActive }) => isActive ?
                                "navbar__link navbar__link_movies navbar__link_movies-active" : "navbar__link navbar__link_movies"
                            }>Сохраненные фильмы</NavLink>

                        </div>
                        <Link to='/profile' className='navbar__accaunt'>
                            <img src={accaunt} className='navbar__accaunt-image' alt='человечек' />
                            <p className='navbar__accaunt-text'>Аккаунт</p>
                        </Link>
                    </div>
                    <div className='navbar navbar_menu'>
                        <button onClick={onOpenMenu} type='button' className='navbar__button-menu'></button>
                    </div>
                </>
            )
            : (
                <div className='navbar navbar_entrance'>
                    <Link to='/signup' className='navbar__link navbar__link_reg'>Регистрация</Link>
                    <button className='navbar__button-log' onClick={() => navigate("/signin", { replace: true })}>Войти</button>
                </div>
            )

    )
}

export default Navigation;