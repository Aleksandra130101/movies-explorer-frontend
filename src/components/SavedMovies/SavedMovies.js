import React from "react";
import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.js";
import { apiMain } from "../../utils/MainApi";
import './SavedMovies.css';

function SavedMovies({
    movies,
    handleSearchMovies,
    handleDeleteMovies,
    handleSavedMovies,
    handleChecked
}) {
    
    useEffect(() => {
        localStorage.removeItem('keyword');
    }, [])


    return (
        <div className="container-movies container-movies_save">
            <SearchForm handleSearchMovies={handleSearchMovies} handleChecked={handleChecked}/>
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