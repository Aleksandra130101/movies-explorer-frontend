import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import './Movies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

import Preloader from "../Preloader/Preloader.js";

import { useState, useEffect } from "react";

function Movies({
    movies,
    handleSearchMovies,
    moviesLoading,
    handleLikeClick,
    handleDeleteLikeClick,
    setIsCheked,
    isNotFound,
    isCheked,
    handleChecked,
    setShortFilms
}) {

    const [visibleItems, setVisibleItems] = useState(7);
    const [quantityAddItems, setQuantityAddItems] = useState(5);
    const [showButton, setShowButton] = useState(false);

    //const savedMovies = JSON.parse(localStorage.getItem('saved-movies'));


    useEffect(() => {
        
        if (window.innerWidth <= 320) {
            setVisibleItems(5);
            setQuantityAddItems(5);
        } else {
            setVisibleItems(7);
            setQuantityAddItems(7);
        }

        let timeoutId = null;

        const handleResize = () => {

            if (window.innerWidth <= 320) {
                setQuantityAddItems(5);
            } else {
                setQuantityAddItems(7);
            }
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => window.innerWidth, 150);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    function handleShowMoreMovies() {
        setVisibleItems(visibleItems + quantityAddItems);
    }

    return (
        <div className="container-movies">
            <SearchForm handleSearchMovies={handleSearchMovies} handleChecked={handleChecked} setShortFilms={setShortFilms}/>
            {moviesLoading
                ? (
                    <Preloader />
                )
                : (

                    <MoviesCardList
                        movies={movies}
                        visibleItems={visibleItems}
                        handleShowMoreMovies={handleShowMoreMovies}
                        handleLikeClick={handleLikeClick}
                        handleDeleteLikeClick={handleDeleteLikeClick}
                        isSaved={false}
                        isNotFound={isNotFound}
                    />
                )
            }
        </div>
    )
}

export default Movies;