import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.js";
import './SavedMovies.css';

function SavedMovies({
    movies,
    handleSearchMovies,
    handleDeleteMovies,
    handleSavedMovies,
    handleChecked,
    isNotFound,
}) {


    return (
        <div className="container-movies container-movies_save">
            <SearchForm handleSearchMovies={handleSearchMovies} handleChecked={handleChecked}/>
            <MoviesCardList
                movies={movies}
                handleSearchMovies={handleSearchMovies}
                isSaved={true}
                handleDeleteLikeClick={handleDeleteMovies}
                handleLikeClick={handleSavedMovies}
                isNotFound={isNotFound}
            />
        </div>
    )
};

export default SavedMovies;