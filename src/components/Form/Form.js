import React from "react";

import './Form.css';
import { Link } from "react-router-dom";

function Form({ title, children, onSubmit }) {
    return (
        <div className="form-container">
            <Link to="/" className="form__logo"></Link>

            <h2 className="form__title">{title}</h2>
            <form onSubmit={onSubmit} className="form">{children}</form>
        </div>
    )
};

export default Form;