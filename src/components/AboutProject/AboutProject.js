import React from "react";

import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h3 className="title">О проекте</h3>

            <div className="description">
                <div className="description__item">
                    <h4 className="description__title">Дипломный проект включал 5 этапов</h4>
                    <p className="description__about">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>

                <div className="description__item">
                    <h4 className="description__title">На выполнение диплома ушло 5 недель</h4>
                    <p className="description__about">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="stages">
                <div className="stage">
                    <p className="stage__weekends stage__weekends-one">1 неделя</p>
                    <p className="stage__description">Back-end</p>
                </div>
                <div className="stage">
                    <p className="stage__weekends stage__weekends-four">4 недели</p>
                    <p className="stage__description">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;