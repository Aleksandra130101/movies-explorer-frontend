import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm.js";
import './SavedMovies.css';
import { useEffect } from "react";

function SavedMovies({
    movies,
    handleSearchMovies,
    handleDeleteMovies,
    handleSavedMovies,
    handleChecked,
    isNotFound,
    setSavedMovies,
    setIsNotFound
}) {
    
    useEffect(() => {
        setIsNotFound(false);
        setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')) || []);
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
                isNotFound={isNotFound}
            />
        </div>
    )
};

export default SavedMovies;