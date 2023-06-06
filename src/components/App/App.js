import React, { useState } from "react";
import './App.css';
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
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import InitialMovieCards from '../../utils/constants.js';
import PopupWithMenu from "../PopupWithMenu/PopuWithMenu";

function App() {
    const { pathname } = useLocation();

    const [cards, setCards] = useState(InitialMovieCards);
    const [loggedIn, setLoggedIn] = useState(true);

    const [isOpenMenuClick, setIsOpenMenuClick] = useState(false);

    function handleOpenMenuClick() {
        setIsOpenMenuClick(!isOpenMenuClick);
    }

    function handleClosePopupMenuClick() {
        setIsOpenMenuClick(false);
    }


    //console.log(cards);
    return (
        <div className="page">

            <Routes>
                <Route path='/' element={
                    <>
                        <Header />
                        <Main />
                        <Footer />
                    </>
                } />

                <Route exact path='/signin' element={<Login />} />

                <Route exact path='/signup' element={<Register />} />

                <Route path='/movies' element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick} />
                        <Movies cards={cards} />
                        <Footer />
                    </ProtectedRoute>
                } />

                <Route path='/saved-movies' element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick}/>
                        <SavedMovies cards={cards} />
                        <Footer />
                    </ProtectedRoute>
                } />

                <Route path='/profile' element={
                    <ProtectedRoute loggedIn={loggedIn}>
                        <Header loggedIn={loggedIn} onOpenMenu={handleOpenMenuClick}/>
                        <Profile />
                    </ProtectedRoute>
                } />

                <Route path='/not-found' element={<NotFound/>} />

                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>

            {isOpenMenuClick && <PopupWithMenu onClose={handleClosePopupMenuClick}/>}

        </div>
    )

}

export default App;