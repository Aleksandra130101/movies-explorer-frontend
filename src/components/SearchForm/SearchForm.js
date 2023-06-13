import React from "react";
import './SearchForm.css';
import { useState } from "react";

function SearchForm({ handleSearchMovies, setIsCheked, isCheked}) {

    const [inputValue, setInputValue] = useState({ movie: '' });

    function onSearchMovies(e) {
        e.preventDefault();

        if (inputValue) {
            localStorage.setItem('keyword', JSON.stringify(inputValue.movie));
            handleSearchMovies();
        }   
    }

    function handleDataMovie(e) {
        const { name, value } = e.target;

        setInputValue({ [name]: value });
    }

    function onChecked(e) {
        setIsCheked(e.target.checked);
    }

    return (
        <section className="search-form">
            <div className="search-form__container">
                <form className="form-movie">
                    <input onChange={handleDataMovie} className="form-movie__input" id="nameProfile" type="text" placeholder="Фильм" value={inputValue.movie} name="movie"></input>
                    <button onClick={onSearchMovies} className="form-movie__button" type="submit"></button>
                </form>

                <label className="checkbox" htmlFor="checkbox">
                    <input className="checkbox__input" type="checkbox" id="checkbox" onChange={onChecked} checked={isCheked}></input>

                    <span className="checkbox__inner">Короткометражки</span>
                </label>


            </div>
        </section>
    )
};

export default SearchForm;