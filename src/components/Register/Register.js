import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import './Register.css';

import { useNavigate } from "react-router-dom";

function Register() {


    const navigate = useNavigate();

    function handleSubmit(e) {
        console.log('тут');
        e.preventDefault();

        navigate('/signin', { replace: true });
    }


    return (
        <section className="container__forms">
            <Form
                title={"Добро пожаловать!"}
                onSubmit={handleSubmit}
            >
                <label className="form__input-signature">Имя</label>
                <input
                    className="form__input"
                    type="text"
                    id="name-register"
                    placeholder=""
                    name="name"
                    required
                />
                <label className="form__input-signature">E-mail</label>
                <input
                    className="form__input"
                    type="email"
                    id="email-register"
                    placeholder=""
                    name="amail"
                    required
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    className="form__input"
                    type="password"
                    id="password-register"
                    name="password"
                    required
                />

                <button className="form__button" type="submit">Зарегистрироваться</button>
                <p className="form__button-signature">Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link></p>
            </Form>

        </section>
    )
};

export default Register;