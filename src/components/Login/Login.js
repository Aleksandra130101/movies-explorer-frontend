import React from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../Form/Form";


function Login({ handleLogin }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    function handleDataUser(evt) {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValue)

        const { email, password } = formValue;
        if (!email || !password) {
            return
        }
        handleLogin(email, password)
            .then(() => {
                setFormValue({ email: '', password: '' });
            })
    }

    return (
        <div className="container__forms">
            <Form
                title={"Рады видеть!"}
                onSubmit={handleSubmit}
            >
                <label className="form__input-signature">E-mail</label>
                <input
                    onChange={handleDataUser}
                    className="form__input"
                    type="email"
                    id="email-login"
                    placeholder="E-mail"
                    name="email"
                    required
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    onChange={handleDataUser}
                    className="form__input"
                    type="password"
                    id="password-login"
                    name="password"
                    placeholder="Пароль"
                    required
                />

                <button className="form__button" type="submit">Войти</button>
                <p className="form__button-signature">Еще не зарегистрированы? <Link className="form__link" to="/signup">Регистрация</Link></p>
            </Form>

        </div>
    )
};

export default Login;