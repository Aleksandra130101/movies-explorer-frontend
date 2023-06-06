import React from "react";
import './AboutMe.css';
import foto from '../../images/dUErbc-VvIY.jpg';
import { Link } from "react-router-dom";

function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__container">
                <h3 className="title">Студентка</h3>

                <div className="resume">
                    <div className="resume__text">
                        <p className="resume__text-name">Александра</p>
                        <p className="resume__text-job">Почти фронтенд-разработчик, 22 года</p>
                        <p className="resume__text-about">Я родилась и живу в Москве,
                            закончила московский государственный педагогический университет. Я люблю слушать музыку, а ещё увлекаюсь
                            бегом. Недавно начала кодить. Прохожу курс от Яндекс Практикума. Все классно!!!</p>
                        <Link to="https://github.com/Aleksandra130101" target="_blank" className="resume__text-git">Githab</Link>
                    </div>
                    <img className="resume__image" src={foto} alt="фото студента" />
                </div>
            </div>
        </section>
    )
}

export default AboutMe;