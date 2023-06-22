import React, { useState, useEffect } from "react";
import './Profile.css';
import { apiMain } from "../../utils/MainApi";
import { validName } from "../../utils/constants";
import { errors } from "../../utils/constants";

function Profile({ signout, setCurrentUser, currentUser }) {

    const [isEdit, setIsEdit] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [error, setErrors] = useState('');
    const [isShow, setIsShow] = useState(false);



    useEffect(() => {
        setFormValue({
            email: currentUser.email,
            name: currentUser.name,
        })
    }, [currentUser, setFormValue]);


    function handleChange(e) {
        setErrors('')
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value,
        })


        if (({...formValue, [name]: value}.email === currentUser.email  && {...formValue,[name]: value}.name === currentUser.name) || (e.target.validationMessage)){
            //console.log('невалидно')
            setIsValid(false);
        } else {
            //console.log('валидно')
            setIsValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        apiMain.updateProfile(formValue)
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    email: formValue.email,
                    name: formValue.name,
                })
                setIsShow(true);
                setIsEdit(false);
            })
            .catch((err) => {
                setErrors(errors.USER_NOT_UNIQUE);
                console.log(err);
            })

        setTimeout(() => {
            setIsShow(false);
        }, 1000)
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
                        ? <input
                            className="user-property"
                            placeholder="Имя"
                            defaultValue={currentUser.name}
                            name="name"
                            type="text"
                            id="name"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            pattern={validName}
                        />
                        : <p className="user-property">{currentUser.name}</p>
                    }

                </div>
                <div className="profile__user">
                    <p className="user-property">E-mail</p>

                    {isEdit
                        ? <input
                            className="user-property"
                            placeholder="Email"
                            defaultValue={currentUser.email}
                            name="email"
                            type="email"
                            id="email"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
                        />
                        : <p className="user-property">{currentUser.email}</p>
                    }

                </div>

            </div>
            {isShow && <span className="edit-success">Данные сохранены!!!</span>}
            {isEdit
                ? <>
                    <span className="error">{error}</span>
                    <button onClick={handleSubmit} className={`profile__saved ${isValid ? '' : 'button__noactive'}`} type="submit" disabled={isValid ? false : true}>Сохранить</button>
                </>

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