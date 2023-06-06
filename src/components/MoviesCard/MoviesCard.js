import React from "react";

import './MoviesCard.css';

function MoviesCard(data) {
    
    return (
        <div className="movie">
            <div className="movie__direction">
                <h3 className="movie__name">{data.card.name}</h3>

                <p className="movie__duration">{data.card.duration}</p>

                <button className={`movie__like-button ${data.card.saved && (window.location.pathname === '/saved-movies') ?
                ('movie__button-delete') : (data.card.saved) ? ('movie__like-button-red') : ('')}`} type="button"></button>
            </div>
            <img className="movie__image" src={data.card.link} alt="картинка фильма"/>
        </div>
    )
};

export default MoviesCard;