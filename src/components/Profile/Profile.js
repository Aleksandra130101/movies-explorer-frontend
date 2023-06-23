import React, { useState, useEffect } from "react";
import './Profile.css';
import { apiMain } from "../../utils/MainApi";
import { validName } from "../../utils/constants";
import { errorsRequest } from "../../utils/constants";
import useValidateForm from "../../hook/useValidateForm";

function Profile({ signout, setCurrentUser, currentUser }) {

    const { values, setValues, handleChange, errors, isValid } = useValidateForm();

    const [isEdit, setIsEdit] = useState(false);
    //const [formValue, setFormValue] = useState({});
    //const [isValid, setIsValid] = useState(false);
    const [disabledForm, setDisabledForm] = useState(true);
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [error, setErrors] = useState('');
    const [isShow, setIsShow] = useState(false);



    useEffect(() => {
        setValues({
            email: currentUser.email,
            name: currentUser.name,
        })
    }, [currentUser, setValues]);
    //console.log(isValid, values);

    useEffect(() => {
        if (!isValid) {
            setDisabledSubmit(true);
            return
        };
        setDisabledSubmit(
            !Object.keys(values).some((key) => values[key] !== currentUser[key])
        );
    }, [currentUser, values, isValid]);

    function handleSubmit(e) {
        e.preventDefault();
        setDisabledSubmit(true);

        apiMain.updateProfile(values)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    email: values.email,
                    name: values.name,
                })
                setIsEdit(false);
                setIsShow(true);
                setDisabledForm(true);
                setErrors('');
            })
            .catch((err) => {
                if (err.includes('409')) {
                    setErrors(errorsRequest.USER_NOT_UNIQUE);
                }
                if (err.includes('400')) {
                    setErrors(errorsRequest.INCORRENT_DATE);
                }
                console.log(err);
            })

        setTimeout(() => {
            setIsShow(false);
        }, 1000)
    }



    function handleOpenEditForm() {
        setDisabledForm(false);
        setIsEdit(true);
    }

    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

                <form className="profile__about" onSubmit={handleSubmit}>
                    <label className="profile__user">
                        <span className="user-property">Имя</span>

                        <input
                            className="user-property"
                            placeholder="Имя"
                            value={values.name || ''}
                            name="name"
                            type="text"
                            id="name"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            pattern={validName}
                            disabled={disabledForm}
                        />
                    </label>
                    <label className="profile__user">
                        <span className="user-property">E-mail</span>

                        <input
                            className="user-property"
                            placeholder="Email"
                            value={values.email || ''}
                            name="email"
                            type="email"
                            id="email"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
                            disabled={disabledForm}
                        />
                    </label>

                    <div className="profile__button-container">
                        {isShow && <span className="edit-success">Данные сохранены!!!</span>}
                        {isEdit
                            ? <>
                                <span className="error">{error}</span>
                                <button className={`profile__saved ${disabledSubmit ? 'button__noactive' : ''}`} type="submit" disabled={isValid ? false : true}>Сохранить</button>
                            </>

                            : <>
                                <button onClick={handleOpenEditForm} className='profile__edit' type='button'>Редактировать</button>
                                <button onClick={signout} className='profile__logout'>Выйти из аккаунта</button>
                            </>
                        }
                    </div>
                </form>

            </div >

        </section >
    )
};

export default Profile;