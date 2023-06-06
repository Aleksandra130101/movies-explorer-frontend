import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {

    return (
        <section className="movies">
            {
                cards.map((card) => (
                    <MoviesCard key={card._id} card={card}></MoviesCard>
                ))
            }
        </section>
    )
};

export default MoviesCardList;