import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import './Register.css';
import { validName } from "../../utils/constants";
import useValidateForm from "../../hook/useValidateForm.js";


function Register({ handleRegister, error }) {

    const { values, handleChange, errors, isValid, resetForm } = useValidateForm();

    useEffect(() => {
        resetForm()
    }, [resetForm])

    function handleSubmit(e) {
        e.preventDefault();

        console.log(values.name, values.email, values.password)

        handleRegister(values.name, values.email, values.password);
    }


    return (
        <section className="container__forms">
            <Form
                onSubmit={handleSubmit}
                title={"Добро пожаловать!"}
                novalidate
            >
                <label className="form__input-signature">Имя</label>
                <input
                    onChange={handleChange}
                    className="form__input"
                    type="text"
                    id="name-register"
                    placeholder="Имя"
                    name="name"
                    minLength={2}
                    maxLength={30}
                    value={values.name || ''}
                    pattern={validName}
                    required
                />
                <span className="form__input-error">
                    {errors['name']
                    ? "Минимум 2 символа. Используйте только латиницу, криллицу, пробел или дефис"
                    : ''
                    }
                </span>

                <label className="form__input-signature">E-mail</label>
                <input
                    onChange={handleChange}
                    className="form__input"
                    type="email"
                    id="email-register"
                    placeholder="E-mail"
                    name="email"
                    value={values.email || ''}
                    pattern='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                    required
                />
                <span className="form__input-error">
                    {errors['email']
                    ? "Введите адрес электронной почты, используя шаблон: example@mail.com"
                    : ''
                    }
                </span>

                <label className="form__input-signature">Пароль</label>
                <input
                    onChange={handleChange}
                    className="form__input form__input-reg"
                    type="password"
                    id="password-register"
                    name="password"
                    placeholder="Пароль"
                    value={values.password || ''}
                    required
                />
                <span className="form__input-error">
                    {errors['password']
                    ? "Это обязательное поле"
                    : ''
                    }
                </span>

                <div className="button__container">
                    <span className="error">{error}</span>
                    <button className={`form__button form__button-register ${isValid ? '' : 'button__noactive'}`} type="submit">Зарегистрироваться</button>
                    <p className="form__button-signature">Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link></p>
                </div>
            </Form>

        </section>
    )
};

export default Register;

