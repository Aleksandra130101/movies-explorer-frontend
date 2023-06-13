import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import './Register.css';
import { validName, validEmail } from "../../utils/constants";


import { useState } from "react";

function Register({ handleRegister }) {

    const [formvalue, setFormValue] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        console.log(formvalue);
        if (validName.test(formvalue.name) && validEmail.test(formvalue.email) && formvalue.password) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    })


    function handleDataNewUser(evt) {
        const { name, value } = evt.target;

        setFormValue({
            ...formvalue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const { name, email, password } = formvalue;
        handleRegister(name, email, password);
    }


    return (
        <section className="container__forms">
            <Form
                onSubmit={handleSubmit}
                title={"Добро пожаловать!"}
            >
                <label className="form__input-signature">Имя</label>
                <input
                    onChange={handleDataNewUser}
                    className="form__input"
                    type="text"
                    id="name-register"
                    placeholder="Имя"
                    name="name"
                    required
                />

                <label className="form__input-signature">E-mail</label>
                <input
                    onChange={handleDataNewUser}
                    className="form__input"
                    type="email"
                    id="email-register"
                    placeholder="E-mail"
                    name="email"
                    required
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    onChange={handleDataNewUser}
                    className="form__input form__input-reg"
                    type="password"
                    id="password-register"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                {
                    !isValid
                        ? <span className="form__input-error">Что-то пошло не так...</span>
                        : ''
                }

                <button className="form__button form__button-register" type="submit">Зарегистрироваться</button>
                <p className="form__button-signature">Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link></p>
            </Form>

        </section>
    )
};

export default Register;