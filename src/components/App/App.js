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
    const [savedMovies, setSavedMovies] = useState([]);

    const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState(JSON.parse(localStorage.getItem('cards')) || []);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isNotFoundKeyword, setIsNotFoundKeyword] = useState(false);
    const [errorReg, setErrorReg] = useState('');
    const [errorLog, setErrorLog] = useState('');

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
                    
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        tokenCheck();

        const findCards = JSON.parse(localStorage.getItem('cards')) || [];

        if (findCards.length !== 0 || JSON.parse(localStorage.getItem('keyword')) !== '') {
            setIsNotFoundKeyword(false);
            setCurrentMovies(findCards);
        } else {
            setIsNotFoundKeyword(true);
        }
        setSavedMovies(currentSavedMovies);
        setIsNotFound(false);

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
                setErrorReg('');
            })
            .catch((err) => {
                setErrorReg(errors.USER_NOT_UNIQUE);
                console.log(err);
            })
    }

    //авторизация
    function handleLogin(email, password) {
        return apiMain.authorize(email, password)
            .then((data) => {
                //console.log(data);
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    tokenCheck();
                    navigate('/movies', { replace: true });
                    setErrorLog('');
                }
            })
            .catch((err) => {
                setErrorLog(errors.INCORRENT_EMAIL_PASSWORD);
                console.log(err);
            })
    }

    //сохранение нового фильма в Local
    //function savedFilmInLocal(film) {
      //  const films = JSON.parse(localStorage.getItem('saved-movies'));
        //films.push(film);
        //localStorage.setItem('saved-movies', JSON.stringify(films));
    //}

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
                //savedFilmInLocal(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //нажатие на поиск всех фильмов
    function handleSearchMovies(keyword) {
        setMoviesLoading(true);
        if (!localStorage.getItem('movies')) {
            apiMovies.getInitialMovies()
                .then((data) => {
                    setMovies(data);
                    localStorage.setItem('movies', JSON.stringify(data));
                    console.log(JSON.parse(localStorage.getItem('movies')))
                    console.log('получили все карточки');
                })
                .catch((err) => {
                    console.log(err);
                })
            setTimeout(() => {searchAllMovies(keyword);}, 1000)
        } else {
            searchAllMovies(keyword);
        }
        
    }

    //поиск всех фильмов
    function searchAllMovies(keyword) {
        if ((keyword !== null && keyword !== '') && localStorage.getItem('movies') !== null) {
            setIsNotFoundKeyword(false);
            
            const foundMovies = searhByKeyword(JSON.parse(localStorage.getItem('movies')), keyword);
            console.log(movies);
            
            if (foundMovies.length !== 0) {
                setCurrentMovies(foundMovies);
                localStorage.setItem('cards', JSON.stringify(foundMovies));
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
                setCurrentMovies(foundMovies);
                localStorage.setItem('cards', JSON.stringify(foundMovies));
            }
        } else {
            setIsNotFound(false);
            setIsNotFoundKeyword(true);
            localStorage.setItem('cards', JSON.stringify([]));
        }
        setMoviesLoading(false);
    }

    //поиск сохраненных фильмов
    function handleSearchSavedMovies(keyword, isChecked) {
        
        setMoviesLoading(true);
        if (keyword !== null && keyword !== '') {
            const foundSavedMovies = searhBySavedKeyword(currentSavedMovies, keyword, isChecked);
            
            setSavedMovies(foundSavedMovies);
            if (foundSavedMovies.length !== 0) {
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
        } else {
            setIsNotFound(false);
            setSavedMovies(currentSavedMovies);
        }
        
        setMoviesLoading(false);
    }

    function searhByKeyword(allMovies, keyword) {
        let foundMovies = [];
        setIsNotFoundKeyword(false);
        allMovies.forEach((movie) => {
            if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) {
                foundMovies.push(movie);
            }
        })
        const isShortFilms = JSON.parse(localStorage.getItem('isChecked'));
        if (isShortFilms !== null) {
            return foundMovies.filter((movie) => movie.duration <= 40)
        } else {
            return foundMovies;
        }
    }

    function searhBySavedKeyword(allSavedMovies, keyword, isChecked) {
        console.log(isChecked);
        let foundSavedMovies = [];
        setIsNotFoundKeyword(false);
        allSavedMovies.forEach((movie) => {
            if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) {
                foundSavedMovies.push(movie);
            }
        })
        const isShortSavedFilms = isChecked;
        if (isShortSavedFilms) {
            console.log('чек');
            return foundSavedMovies.filter((movie) => movie.duration <= 40);
        } else {
            console.log('нечек');
            return foundSavedMovies;
        }
    }

    //короткометражки
    function handleChecked(isChecked) {
        if (isChecked) {
            const films = currentMovies.filter((movie) => movie.duration <= 40)
            setCurrentMovies(films);
            localStorage.setItem('isChecked', JSON.stringify(isChecked));
            localStorage.setItem('cards', JSON.stringify(films));
            if (films.length === 0) {
                setIsNotFound(true);
            } else {
                setIsNotFound(false);
            }  
        } else {
            localStorage.removeItem('isChecked');
            handleSearchMovies(JSON.parse(localStorage.getItem('keyword')));
        }
    }

    //сохраненные короткометражки
    function handleSavedChecked(isChecked, keyword) {
        if (isChecked) {
            const films = savedMovies.filter((movie) => movie.duration <= 40)
            if (films.length !== 0) {
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
            setSavedMovies(films);
        } else {
            handleSearchSavedMovies(keyword);
        }

    }

    //удаление карточек
    function handleDeleteMovies(movie) {
        apiMain.deleteMovie(movie._id)
            .then((movie) => {
                const newSavedCurrentMovies = currentSavedMovies.filter((savedMovie) => {
                    if (movie.data._id !== savedMovie._id) {
                        return savedMovie
                    }
                });
                const newSavedMovies = savedMovies.filter((savedMovie) => {
                    if (movie.data._id !== savedMovie._id) {
                        return savedMovie
                    }
                });
                setSavedMovies(newSavedMovies);
                setCurrentSavedMovies(newSavedCurrentMovies);
                //deleteMovieInLocal(movie);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //выход из аккаунта 
    function signout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('cards');
        localStorage.removeItem('isChecked');
        localStorage.removeItem('keyword');
        localStorage.removeItem('saved-movies');
        localStorage.removeItem('movies');
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

                    <Route exact path='/signin' element={<Login handleLogin={handleLogin} error={errorLog} />} />

                    <Route exact path='/signup' element={<Register handleRegister={handleRegister} error={errorReg} />} />

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
                                isNotFoundKeyword={isNotFoundKeyword}
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
                                isNotFound={isNotFound}

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