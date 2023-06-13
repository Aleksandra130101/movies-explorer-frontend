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

import PopupWithMenu from "../PopupWithMenu/PopuWithMenu";


function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [registerIn, setRegisterIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [moviesLoading, setMoviesLoading] = useState(false);

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [isCheked, setIsCheked] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const [isOpenMenuClick, setIsOpenMenuClick] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    //проверяем токен
    useEffect(() => {
        if (loggedIn) {
            apiMovies.getInitialMovies()
                .then((data) => {
                    setMovies(data);
                })
            apiMain.getSavedMovies()
                .then((cards) => {
                    console.log(movies);
                    setSavedMovies(cards);
                    const savedCards = JSON.parse(localStorage.getItem('cards'));

                    if (savedCards) {
                        setCurrentMovies(savedCards);
                    }
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        tokenCheck();
    }, []);

    function tokenCheck() {
        const token = localStorage.getItem('token');

        if (token) {
            apiMain.getContent(token)
                .then((user) => {
                    if (user) {
                        setLoggedIn(true);
                        setCurrentUser(user);

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
                    navigate('/movies', { replace: true });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //создание и сохранение фильмов
    function handleSavedMovies(movie) {

        apiMain.createMovies(movie)
            .then((data) => {
                setSavedMovies([
                    ...savedMovies,
                    data
                ])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //поиск из всех фильмов
    function handleSearchMovies() {
        const keyword = JSON.parse(localStorage.getItem('keyword'))
        setMoviesLoading(true);

        const foundMovies = searhByKeyword(movies, keyword);
        if (foundMovies.length !== 0) {
            setCurrentMovies(foundMovies);
            localStorage.setItem('cards', JSON.stringify(foundMovies));
            setIsNotFound(false);
        } else {
            setIsNotFound(true);
        }

        setMoviesLoading(false);
    }

    //поиск сохраненных фильмов
    function handleSearchSavedMovies() {
        const keyword = JSON.parse(localStorage.getItem('keyword'));
        setMoviesLoading(true);

        const foundSavedMovies = searhByKeyword(savedMovies, keyword);
        setSavedMovies(foundSavedMovies);
        setMoviesLoading(false);
    }

    function searhByKeyword(allMovies, keyword) {
        let foundMovies = [];

        allMovies.forEach((movie) => {
            if (movie.nameRU.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                if (isCheked) {
                    movie.duration <= 40 && foundMovies.push(movie)
                } else {
                    foundMovies.push(movie);
                }
            }
        })
        return foundMovies;
    }

    //удаление карточек
    function handleDeleteMovies(movie) {
        console.log(movie);
        apiMain.deleteMovie(movie._id)
            .then((movie) => {
                const newSavedMovies = savedMovies.filter((savedMovie) => {
                    if (movie.data._id !== savedMovie._id) {
                        return savedMovie
                    }
                });
                setSavedMovies(newSavedMovies);
            })
    }

    //выход из аккаунта 
    function signout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('cards');
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

                    <Route exact path='/signin' element={<Login handleLogin={handleLogin} />} />

                    <Route exact path='/signup' element={<Register handleRegister={handleRegister} />} />

                    <Route path='/movies' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />

                            <Movies
                                movies={currentMovies}
                                handleSearchMovies={handleSearchMovies}
                                moviesLoading={moviesLoading}
                                handleLikeClick={handleSavedMovies}
                                handleDeleteLikeClick={handleDeleteMovies}
                                isCheked={isCheked}
                                setIsCheked={setIsCheked}
                                isNotFound={isNotFound}
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
                                isCheked={isCheked}
                                setIsCheked={setIsCheked}
                                />
                            <Footer />
                        </ProtectedRoute>
                    } />

                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={loggedIn}>
                            <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />
                            <Profile signout={signout} setCurrentUser={setCurrentUser}/>
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