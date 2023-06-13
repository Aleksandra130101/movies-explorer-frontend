import React, { useState, useContext, useEffect } from "react";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { apiMain } from "../../utils/MainApi";
import { validEmail, validName } from "../../utils/constants";

function Profile({ signout, setCurrentUser }) {

    const [isEdit, setIsEdit] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [isValid, setIsValid] = useState(true);

    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        setFormValue({
            email: currentUser.email,
            name: currentUser.name,
        })
    }, [currentUser, setFormValue]);

    useEffect(() => {
        if (validName.test(formValue.name) && validEmail.test(formValue.email)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    })


    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value,
        })
    }
    console.log(currentUser)

    function handleSubmit(e) {
        e.preventDefault();


        if (formValue.name === currentUser.name && formValue.email === currentUser.email) {
            setIsEdit(true)
            return
        }

        apiMain.updateProfile(formValue)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    email: formValue.email,
                    name: formValue.name,
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function handleOpenEditForm() {
        setIsEdit(true);
    }

    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

                <div className="profile__about">
                    <div className="profile__user">
                        <p className="user-property">Имя</p>

                        {isEdit
                            ? <input className="user-property" placeholder="Имя" defaultValue={currentUser.name} name="name" type="text" id="name" required minLength="2" maxLength="30" onChange={handleChange} />
                            : <p className="user-property">{currentUser.name}</p>
                        }

                    </div>
                    <div className="profile__user">
                        <p className="user-property">E-mail</p>

                        {isEdit
                            ? <input className="user-property" placeholder="Email" defaultValue={currentUser.email} name="email" type="email" id="email" required minLength="2" maxLength="30" onChange={handleChange} />
                            : <p className="user-property">currentUser.email</p>
                        }

                    </div>
                </div>
                {isEdit
                    ? <button onClick={handleSubmit} className={`profile__saved ${isValid ? '' : 'profile__saved_noactive'}`} type="submit" disabled={isValid ? false : true}>Сохранить</button>
                    : <>
                        <button onClick={handleOpenEditForm} className='profile__edit' type='button'>Редактировать</button>
                        <button onClick={signout} className='profile__logout'>Выйти из аккаунта</button>
                    </>
                }

            </div>

        </section>
    )
};

export default Profile;