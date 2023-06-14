import React, { useState } from "react";
import './App.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import { apiMain } from "../../utils/MainApi";
import { apiMovies } from "../../utils/MoviesApi";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { errors } from "../../utils/constants";

import PopupWithMenu from "../PopupWithMenu/PopuWithMenu";


function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [registerIn, setRegisterIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [moviesLoading, setMoviesLoading] = useState(false);

    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('saved-movies')) || []);

    const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState(JSON.parse(localStorage.getItem('cards')) || []);
    const [isNotFound, setIsNotFound] = useState(false);
    const [error, setError] = useState('');

    const [isOpenMenuClick, setIsOpenMenuClick] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    //проверяем токен
    useEffect(() => {
        if (loggedIn) {
            apiMain.getSavedMovies()
                .then((cards) => {
                    setSavedMovies(cards);
                    setCurrentSavedMovies(cards);
                    const findSavedCards = JSON.parse(localStorage.getItem('saved-movies'));
                    //console.log(findSavedCards);
                    
                    if (findSavedCards) {
                        setSavedMovies(findSavedCards);
                    }
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        tokenCheck();
        const findCards = JSON.parse(localStorage.getItem('cards'));

        if (findCards) {
            setCurrentMovies(findCards);
        }
    }, []);


    function tokenCheck() {
        const token = localStorage.getItem('token');

        if (token) {
            apiMain.getContent(token)
                .then((user) => {
                    if (user) {
                        setLoggedIn(true);
                        setCurrentUser(user);
                        location.pathname === '/signin' || location.pathname === '/signup' ? navigate('/movies', { replace: true }) : navigate(location.pathname);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    //открытие меню
    function handleOpenMenuClick() {
        setIsOpenMenuClick(!isOpenMenuClick);
    }

    //закрытие меню
    function handleClosePopupMenuClick() {
        setIsOpenMenuClick(false);
    }

    //регистрация

    function handleRegister(name, email, password) {
        return apiMain.register(name, email, password)
            .then(() => {
                setRegisterIn(!registerIn);
                console.log('Регистрация прошла успешно');
                handleLogin(email, password);
            })
            .catch((err) => {
                setError(errors.USER_NOT_UNIQUE);
                console.log(err);
            })
    }

    function getBeatfilm() {
        apiMovies.getInitialMovies()
            .then((data) => {
                localStorage.setItem('movies', JSON.stringify(data));
                setCurrentMovies(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //авторизация
    function handleLogin(email, password) {
        //console.log("email=" + email + " pass=" + password)
        return apiMain.authorize(email, password)
            .then((data) => {
                //console.log(data);
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                    navigate('/movies', { replace: true });
                }
                getBeatfilm();
            })
            .catch((err) => {
                setError(errors.INCORRENT_EMAIL_PASSWORD)
                console.log(err);
            })
    }

    //сохранение нового фильма в Local
    function savedFilmInLocal(film) {
        const films = JSON.parse(localStorage.getItem('saved-movies'));
        films.push(film);
        localStorage.setItem('saved-movies', JSON.stringify(films));
    }

    //создание и сохранение фильмов
    function handleSavedMovies(movie) {

        apiMain.createMovies(movie)
            .then((data) => {
                setSavedMovies([
                    ...savedMovies,
                    data
                ])
                setCurrentSavedMovies([
                    ...currentSavedMovies,
                    data
                ])
                savedFilmInLocal(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //поиск из всех фильмов
    function handleSearchMovies() {
        setMoviesLoading(true);
        const keyword = JSON.parse(localStorage.getItem('keyword'))
        const foundMovies = searhByKeyword(movies, keyword);
        if (foundMovies.length !== 0) {
            setCurrentMovies(foundMovies);
            localStorage.setItem('cards', JSON.stringify(foundMovies));
            setIsNotFound(false);
        } else {
            setIsNotFound(true);
            setCurrentMovies(foundMovies);
            localStorage.setItem('cards', JSON.stringify(foundMovies));
        }
        setMoviesLoading(false);
    }

    //поиск сохраненных фильмов
    function handleSearchSavedMovies() {
        const keyword = JSON.parse(localStorage.getItem('keyword'));
        setMoviesLoading(true);
        const foundSavedMovies = searhByKeyword(currentSavedMovies, keyword);
        if (foundSavedMovies !== 0) {
            setSavedMovies(foundSavedMovies);
            //localStorage.setItem('saved-movies', JSON.stringify(foundSavedMovies));
            setIsNotFound(false);
        } else {
            setIsNotFound(true);
            setSavedMovies(foundSavedMovies);
            //localStorage.setItem('saved-movies', JSON.stringify(foundSavedMovies));
        }
        setMoviesLoading(false);
    }

    //короткометражки
    function handleChecked(isChecked) {
        if (isChecked) {
            const films = currentMovies.filter((movie) => movie.duration <= 40)
            setCurrentMovies(films);
            //localStorage.setItem('isCheked', JSON.stringify(isChecked));
            localStorage.setItem('cards', JSON.stringify(films));
        } else {
            //localStorage.removeItem('isCheked');
            handleSearchMovies();
        }
    }

    //сохраненные короткометражки
    function handleSavedChecked(isChecked) {
        if (isChecked) {
            const films = savedMovies.filter((movie) => movie.duration <= 40)
            setSavedMovies(films);
            localStorage.setItem('isCheked', JSON.stringify(isChecked));
        } else {
            localStorage.removeItem('isCheked');
            handleSearchSavedMovies();
        }

    }

    function searhByKeyword(allMovies, keyword) {
        let foundMovies = [];
        //console.log(allMovies);
        //console.log(keyword);

        allMovies.forEach((movie) => {
            if (keyword != null) {
                if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) && keyword !== '') {
                    foundMovies.push(movie);
                    console.log(foundMovies);
                }
            } else {
                foundMovies.push(movie);
            }
        });
        const isShortFilms = JSON.parse(localStorage.getItem('isChecked'));
        if (isShortFilms !== null) {
            return foundMovies.filter((movie) => movie.duration <= 40)
        } else {
            if (keyword === '') {
                return allMovies
            } else {
                console.log(keyword);
                return foundMovies;
            }
        }
    }

    //удаление карточки из local
    function deleteMovieInLocal(movie) {
        const newSavedFilms = savedMovies.filter((film) => film._id !== movie.data._id);
        console.log(savedMovies);
        console.log(movie)
        localStorage.setItem('saved-movies', JSON.stringify(newSavedFilms));
    }

    //удаление карточек
    function handleDeleteMovies(movie) {
        apiMain.deleteMovie(movie._id)
            .then((movie) => {
                const newSavedMovies = savedMovies.filter((savedMovie) => {
                    if (movie.data._id !== savedMovie._id) {
                        return savedMovie
                    }
                });
                setSavedMovies(newSavedMovies);
                deleteMovieInLocal(movie);
            })
    }

    ///const movieId = 1;

    //const arr = savedMovies.filter((movie) => movie.movieId !== movieId);
    //console.log(arr);
    //выход из аккаунта 
    function signout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('cards');
        localStorage.removeItem('isChecked');
        localStorage.removeItem('keyword');
        localStorage.removeItem('saved-movies');
        navigate('/', { replace: true });
        window.location.reload();
    }

    //console.log(cards);
    return (
        <CurrentUserContext.Provider value={{ currentUser, savedMovies }}>
            <div className="page">

                <Routes>
                    <Route exact path='/' element={
                        <>
                            <Header loggedIn={loggedIn} />
                            <Main />
                            <Footer />
                        </>
                    } />

                    <Route exact path='/signin' element={<Login handleLogin={handleLogin} error={error}/>} />

                    <Route exact path='/signup' element={<Register handleRegister={handleRegister} error={error}/>} />

                    <Route exact path='/movies' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />

                            <Movies
                                movies={currentMovies}
                                handleSearchMovies={handleSearchMovies}
                                moviesLoading={moviesLoading}
                                handleLikeClick={handleSavedMovies}
                                handleDeleteLikeClick={handleDeleteMovies}
                                //isCheked={isCheked}
                                //setIsCheked={setIsCheked}
                                isNotFound={isNotFound}
                                handleChecked={handleChecked}
                            />

                            <Footer />
                        </ProtectedRoute>
                    } />

                    <Route path='/saved-movies' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />
                            <SavedMovies
                                movies={savedMovies}
                                handleSearchMovies={handleSearchSavedMovies}
                                handleDeleteMovies={handleDeleteMovies}
                                handleSavedMovies={handleSavedMovies}
                                handleChecked={handleSavedChecked}
                            //isChecked={isChecked}
                            //setIsCheked={setIsCheked}
                            />
                            <Footer />
                        </ProtectedRoute>
                    } />

                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />
                            <Profile signout={signout} setCurrentUser={setCurrentUser} currentUser={currentUser} />
                        </ProtectedRoute>
                    } />

                    <Route path='/not-found' element={<NotFound />} />

                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Routes>

                {isOpenMenuClick && <PopupWithMenu onClose={handleClosePopupMenuClick} />}

            </div>
        </CurrentUserContext.Provider>
    )

}

export default App;