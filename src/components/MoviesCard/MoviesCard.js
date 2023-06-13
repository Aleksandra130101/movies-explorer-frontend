import React, { useContext } from "react";

import './MoviesCard.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function MoviesCard({isFavorite, ...props}) {
    
    //const { savedMovies } = useContext(CurrentUserContext);
    
    //console.log(props);
    
    //const [isLiked, setIsLiked] = useState(savedMovies.map((movie) => movie._id).includes(props.movie._id));
    

    function onLikeClick() {
        props.handleLikeClick(props.movie)
        //setIsLiked(true);
        //props.handleLikeClick(props.movie);
    }

    //function getIdCard() {
      //  const idMovie = savedMovies.filter((movie) => movie._id === props.movie._id)
        //return idMovie
    //}

    function onDeleteLike() {
        props.handleDeleteLikeClick(props.movie);
        //setIsLiked(false);
        //props.handleDeleteLikeClick(getIdCard()[0]._id);
    }

    const location = useLocation();

    //const cardLikeButtonClassName = (
      //  `movie__like-button ${isLiked && 'movie__like-button-red'}`
    //);

    const urlImage = (
        `${location.pathname === '/saved-movies' ? props.movie.image : `https://api.nomoreparties.co${props.movie.image.url}`}`
    );

    function onOpenTrailer() {
        window.location.assign(props.movie.trailerLink);
    }



    return (
        <div className="movie">
            <div className="movie__direction">
                <h3 className="movie__name">{props.movie.nameRU}</h3>

                <p className="movie__duration">{props.movie.duration}</p>

                {location.pathname === '/movies'  && !isFavorite && (
                    <button className="movie__like-button" onClick={onLikeClick} type="button"/>
                )}

                {location.pathname === "/saved-movies" && (
                    <button className="movie__like-button movie__button-delete" onClick={onDeleteLike} type="button"/>
                )}

                {location.pathname === "/movies" && isFavorite && (
                    <button className="movie__like-button movie__like-button-red" onClick={onDeleteLike} type="button"/>
                )}


            </div>
            <img className="movie__image" src={urlImage} alt="картинка фильма" onClick={onOpenTrailer} />
        </div>
    )
};

//<button className={`movie__like-button ${data.card.saved && (window.location.pathname === '/saved-movies') ?
//             ('movie__button-delete') : (data.card.saved) ? ('movie__like-button-red') : ('')}`} type="button"></button>

export default MoviesCard;