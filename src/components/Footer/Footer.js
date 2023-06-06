import React from "react";


import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>

                <div className="footer__content">
                    <p className="footer__content-year">© {new Date().getFullYear()}</p>
                    <div className="footer__about-course">
                        <a href="https://practicum.yandex.ru/" className="footer__about-text" target="_blank">Яндекс.Практикум</a>
                        <a href="https://github.com/Aleksandra130101" className="footer__about-text" target="_blank">Githab</a>
                    </div>
                </div>
            </div>

        </footer>

    )
}

export default Footer;