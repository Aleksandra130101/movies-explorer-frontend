import React from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Form from "../Form/Form";

function Login() {

    const navigate = useNavigate();

    function handleSubmit(e) {
        console.log('тут');
        e.preventDefault();

        navigate('/profile', { replace: true });
    }

    return (
        <div className="container__forms">
            <Form
                title={"Рады видеть!"}
                onSubmit={handleSubmit}
            >
                <label className="form__input-signature">E-mail</label>
                <input
                    className="form__input"
                    type="email"
                    id="email-login"
                    placeholder=""
                    name="amail"
                    required
                />
                <label className="form__input-signature">Пароль</label>
                <input
                    className="form__input"
                    type="password"
                    id="password-login"
                    name="password"
                    required
                />

                <button className="form__button" type="submit">Войти</button>
                <p className="form__button-signature">Еще не зарегистрированы? <Link className="form__link" to="/signup">Регистрация</Link></p>
            </Form>

        </div>
    )
};

export default Login;