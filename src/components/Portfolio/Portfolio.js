import React from "react";
import './Portfolio.css';
import link from '../../images/link.svg';
import { Link } from "react-router-dom";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <div className="portfolio__items">
                <div className="portfolio__item">
                    <Link className="portfolio__link">Статичный сайт</Link>
                    <button className="portfolio__link-image" alt="стрелочка"></button>
                </div>

                <div className="portfolio__item">
                    <Link className="portfolio__link">Адаптивный сайт</Link>
                    <button className="portfolio__link-image" alt="стрелочка"></button>
                </div>

                <div className="portfolio__item">
                    <Link className="portfolio__link">Одностраничное приложение</Link>
                    <button className="portfolio__link-image" alt="стрелочка"></button>
                </div>
            </div>
        </section>
    )
};

export default Portfolio;