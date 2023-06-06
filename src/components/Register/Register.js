import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import './Register.css';

import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    function handleSubmit(data) {

        console.log(data);

        navigate('/signin', { replace: true });
    }


    return (
        <section className="container__forms">
            <Form
                onSubmit={handleSubmit}
                title={"Добро пожаловать!"}
            >
                <label className="form__input-signature">Имя</label>
                <input
                    className="form__input"
                    type="text"
                    id="name-register"
                    placeholder="Имя"
                    name="name"
                    required
                />
                <label className="form__input-signature">E-mail</label>
                <input
                    className="form__input"
                    type="email"
                    id="email-register"
                    placeholder="E-mail"
                    name="amail"
                    required
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    className="form__input form__input-reg"
                    type="password"
                    id="password-register"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <span className="form__input-error">Что-то пошло не так</span>

                <button className="form__button form__button-register" type="submit">Зарегистрироваться</button>
                <p className="form__button-signature">Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link></p>
            </Form>

        </section>
    )
};

export default Register;