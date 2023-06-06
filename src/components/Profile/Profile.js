import React from "react";
import './Profile.css';

import { Link } from "react-router-dom";

function Profile() {
    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, Александра</h2>

                <div className="profile__about">
                    <div className="profile__user">
                        <p className="user-property">Имя</p>
                        <p className="user-property">Александра</p>
                    </div>
                    <div className="profile__user">
                        <p className="user-property">Email</p>
                        <p className="user-property">averianovaalex@mail.ru</p>
                    </div>
                </div>

                <button className='profile__edit'>Редактировать</button>
                <Link to="/" className='profile__logout'>Выйти из аккаунта</Link>
            </div>

        </section>
    )
};

export default Profile;