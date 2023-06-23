import React from "react";

import './LoadingCards.css';

function LoadingCards({ onShowMoreMovies }) {
    return (
        <div className="loading-cards">
            <button onClick={onShowMoreMovies} className="loading-cards__button">Ещё</button>
        </div>
    )
};

export default LoadingCards;