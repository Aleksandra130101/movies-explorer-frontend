import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import './Movies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import LoadingCards from "../LoadingCards/LoadingCards.js";

function Movies({ cards }) {
    return (
        <div className="container-movies">
            <SearchForm />
            <MoviesCardList cards={cards} />
            <LoadingCards/>
        </div>
    )
}

export default Movies;