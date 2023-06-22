import React from "react";
import './SearchForm.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearchMovies, handleChecked }) {

    const location = useLocation();

    const [isChecked, setIsChecked] = useState(false);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('isChecked')) {
            setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
        } else {
            //console.log('не получилось');
            //console.log(JSON.parse(localStorage.getItem('isChecked')))
            setIsChecked(false);
        }
        if (location.pathname === '/movies' && localStorage.getItem('keyword')) {
            setKeyword(JSON.parse(localStorage.getItem('keyword')));
            //console.log(JSON.parse(localStorage.getItem('keyword')));
        } else {
            //console.log(JSON.parse(localStorage.getItem('keyword')));
            setKeyword('');
        }
    }, []);

    function onSearchMovies(e) {
        e.preventDefault();
        //console.log('Прив');
        //console.log(keyword);

        if (keyword !== '') {
            setKeyword(keyword);
        } else {
            setKeyword('');
        }

        if (location.pathname === '/movies') {
            localStorage.setItem('keyword', JSON.stringify(keyword))
            //console.log(JSON.parse(localStorage.getItem('keyword')));
        }

        setTimeout(() => {
            handleSearchMovies(keyword, isChecked);
        }, 1000);
    }

    function handleDataMovie(e) {
        
        const { value } = e.target;

        setKeyword(value);
    }

    function onChecked(e) {

        if (e.target.checked) {
            setIsChecked(e.target.checked)
        } else {
            setIsChecked(false);
        }
        handleChecked(e.target.checked, keyword);
    }

    return (
        <section className="search-form">
            <div className="search-form__container">
                <form className="form-movie">
                    <input onChange={handleDataMovie}  className="form-movie__input" id="nameProfile" type="text" placeholder="Фильм" value={keyword || ''} name="movie"></input>
                    <button onClick={onSearchMovies}  className="form-movie__button" type="submit"></button>
                </form>

                <label className="checkbox" htmlFor="checkbox">
                    <input onChange={onChecked} className="checkbox__input" type="checkbox" id="checkbox"  checked={isChecked}></input>

                    <span className="checkbox__inner">Короткометражки</span>
                </label>


            </div>
        </section>
    )
};

export default SearchForm;