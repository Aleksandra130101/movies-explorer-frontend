import React from "react";
import logo from '../../images/logo.svg';

import './Form.css';

function Form({ title, children, onSubmit }) {
    return (
        <div className="form-container">
            <button className="form__logo"></button>

            <h2 className="form__title">{title}</h2>
            <form onSubmit={onSubmit} className="form">{children}</form>
        </div>
    )
};

export default Form;