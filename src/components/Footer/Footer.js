import React from "react";


import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>

            <div className="footer__content">
                <p className="footer__content-year">© {new Date().getFullYear()}</p>
                <div className="footer__about-course">
                    <p className="footer__about-text">Яндекс.Практикум</p>
                    <p className="footer__about-text">Githab</p>
                </div>
            </div>

        </footer>

    )
}

export default Footer;