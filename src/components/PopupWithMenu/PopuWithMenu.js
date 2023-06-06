import React from "react";

import './PopupWithMenu.css';
import accaunt from '../../images/accaunt.svg';


import { NavLink, Link } from "react-router-dom";

function PopupWithMenu({ onClose }) {

    return (
        <section className="popup-menu">
            <div className="popup-menu__container">
                <button type="button" className="popup-menu__button-close" onClick={onClose}></button>

                <nav className="popup-menu__links">
                    <NavLink to='/profile' className={({ isActive }) => isActive ?
                        "popup-menu__link popup-menu__link-active" : "popup-menu__link"
                    }>Главная</NavLink>

                    <NavLink to='/movies' className={({ isActive }) => isActive ?
                                "popup-menu__link popup-menu__link-active" : "popup-menu__link"
                            }>Фильмы</NavLink>

                    <NavLink to='/saved-movies' className={({ isActive }) => isActive ?
                                "popup-menu__link popup-menu__link-active" : "popup-menu__link"
                            }>Сохраненные фильмы</NavLink>
                </nav>
                <Link onClick={onClose} to='/profile' className='popup-menu__accaunt'>
                    <img src={accaunt} className='popup-menu__accaunt-image' alt='человечек' />
                    <p className='popup-menu__accaunt-text'>Аккаунт</p>
                </Link>
            </div>
        </section>
    )
};

export default PopupWithMenu;