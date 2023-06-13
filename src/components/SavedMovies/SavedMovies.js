import React from "react";
import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.js";
import { apiMain } from "../../utils/MainApi";
import './SavedMovies.css';

function SavedMovies({movies, handleSearchMovies, handleDeleteMovies, handleSavedMovies, isCheked, setIsCheked}) {
    //console.log(movies);


    return (
        <div className="container-movies container-movies_save">
            <SearchForm handleSearchMovies={handleSearchMovies} isCheked={isCheked} setIsCheked={setIsCheked} />
            <MoviesCardList
                movies={movies}
                handleSearchMovies={handleSearchMovies}
                isSaved={true}
                handleDeleteLikeClick={handleDeleteMovies}
                handleLikeClick={handleSavedMovies}
            />
        </div>
    )
};

export default SavedMovies;