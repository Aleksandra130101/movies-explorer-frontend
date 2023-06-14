import React, { useEffect } from "react";
import './Login.css';
import { Link } from 'react-router-dom';
import ValidateForm from "../../hook/ValidateForm";
import Form from "../Form/Form";


function Login({ handleLogin, error }) {

    const { values, handleChange, errors, isValid, resetForm } = ValidateForm();


    useEffect(() => {
        resetForm()
    }, [resetForm])

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)


        handleLogin(values.email, values.password)
        //.then(() => {
        //  setFormValue({ email: '', password: '' });
        //})
    }

    return (
        <div className="container__forms">
            <Form
                title={"Рады видеть!"}
                onSubmit={handleSubmit}
                novalidate
            >
                <label className="form__input-signature">E-mail</label>
                <input
                    onChange={handleChange}
                    className="form__input"
                    type="email"
                    id="email-login"
                    placeholder="E-mail"
                    name="email"
                    required
                    value={values.email || ''}
                    pattern='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    onChange={handleChange}
                    className="form__input"
                    type="password"
                    id="password-login"
                    name="password"
                    placeholder="Пароль"
                    value={values.password || ''}
                    required
                />
                {
                    !isValid
                        ? <span className="form__input-error">Что-то пошло не так...</span>
                        : ''
                }

                <div className="button__container">
                    <span className="error">{error}</span>
                    <button className={`form__button ${isValid ? '' : 'button__noactive'}`} type="submit">Войти</button>
                    <p className="form__button-signature">Еще не зарегистрированы? <Link className="form__link" to="/signup">Регистрация</Link></p>
                </div>
            </Form>

        </div>
    )
};

export default Login;