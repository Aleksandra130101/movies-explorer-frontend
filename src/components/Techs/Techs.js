import React from "react";

import './Techs.css';

function Techs() {
    return (
        <section className="techs">
            <h3 className="title">Технологии</h3>

            <div className="techs__description">
                <p className="techs__title">7 технологий</p>

                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

                <div className="techs__icons">
                    <div className="techs__icon">HTML</div>
                    <div className="techs__icon">CSS</div>
                    <div className="techs__icon">JS</div>
                    <div className="techs__icon">React</div>
                    <div className="techs__icon">Git</div>
                    <div className="techs__icon">Express.js</div>
                    <div className="techs__icon">mongoDB</div>
                </div>
            </div>
        </section>
    )
}

export default Techs;