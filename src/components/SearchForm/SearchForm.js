import React from "react";
import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search-form">
            <form className="form-movie">
                <input className="form-movie__input" id="nameProfile" type="text" placeholder="Фильм"></input>
                <button className="form-movie__button" type="submit"></button>
            </form>

            <div className="form-movie__switch">
                <button className="form-movie__button-switch"></button>
                <p className="form-movie__text-switch">Короткометражки</p>
            </div>
        </section>
    )
};

export default SearchForm;