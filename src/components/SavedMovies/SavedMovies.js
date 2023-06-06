import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.js";
import './SavedMovies.css';

function SavedMovies({ cards }) {
    return (
        <div className="container-movies container-movies_save">
            <SearchForm />
            <MoviesCardList cards={cards.filter(card => card.saved === true)}/>
        </div>
    )
};

export default SavedMovies;