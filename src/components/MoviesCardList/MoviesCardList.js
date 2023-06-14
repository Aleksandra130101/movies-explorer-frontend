import React, { useContext } from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import LoadingCards from "../LoadingCards/LoadingCards";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCardList({
  movies,
  visibleItems,
  handleShowMoreMovies,
  handleLikeClick,
  handleDeleteLikeClick,
  isSaved,
  isNotFound
}) {

  const { savedMovies } = useContext(CurrentUserContext);

  function isFavorite(movie) {
    return savedMovies.reduce((res, favorite) => {
      if (favorite.movieId === movie.id) {
        movie._id = favorite._id;
        return true
      }
      return res
    }, false)
  }

  return (
    <section className="movies">
      {
        isNotFound
          ? <p className="movies__not-found">Ничего не найдено</p>
          : (
            <>
              {movies.slice(0, visibleItems).map((movie, index) => (
                <MoviesCard
                  movie={movie}
                  key={index}
                  handleLikeClick={handleLikeClick}
                  handleDeleteLikeClick={handleDeleteLikeClick}
                  isSaved={isSaved}
                  isFavorite={isFavorite(movie)}
                />
              ))}
              {(movies.length - 2 >= visibleItems) && <LoadingCards onShowMoreMovies={handleShowMoreMovies} />}
            </>
          )
      }
    </section>

  )
};

export default MoviesCardList;

