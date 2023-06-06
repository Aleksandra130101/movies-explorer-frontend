import React from "react";
import './Promo.css';

import promoImage from '../../images/promo.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <div className="promo__image-container">
                    <img src={promoImage} className="promo__image" alt="картинка для промо" />
                </div>
            </div>
        </section>
    )
}

export default Promo;