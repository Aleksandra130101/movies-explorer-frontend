import React from "react";
import './Portfolio.css';
import link from '../../images/link.svg';
import { Link } from "react-router-dom";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <div className="portfolio__container">
                <p className="portfolio__title">Портфолио</p>
                <div className="portfolio__items">
                    <div className="portfolio__item">
                        <Link to="https://aleksandra130101.github.io/russian-travel/" target='_blank' className="portfolio__link">Статичный сайт</Link>
                        <Link to="https://aleksandra130101.github.io/russian-travel/"target='_blank' className="portfolio__link-image"></Link>
                    </div>

                    <div className="portfolio__item">
                        <Link to="https://aleksandra130101.github.io/russian-travel/" target='_blank' className="portfolio__link">Адаптивный сайт</Link>
                        <Link to="https://aleksandra130101.github.io/russian-travel/" target='_blank' className="portfolio__link-image"></Link>
                    </div>

                    <div className="portfolio__item">
                        <Link to="https://aleksandra130101.github.io/mesto/" target='_blank' className="portfolio__link">Одностраничное приложение</Link>
                        <Link to="https://aleksandra130101.github.io/mesto/" target='_blank' className="portfolio__link-image"></Link>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Portfolio;