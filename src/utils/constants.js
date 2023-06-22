
import { useState } from "react";

export function filterMovies(movies, keyword) {

  return (movies.filter(movie => movie.nameRU.includes(keyword.movie)))
}

export const validName = '^[а-яА-ЯёЁa-zA-Z0-9 -]+$';
export const validProfileName = /^[а-яА-ЯёЁa-zA-Z0-9 -]+$/;
export const validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


export const errors = {
  USER_NOT_UNIQUE: 'Пользователь с таким email уже существует.',
  INCORRENT_EMAIL_PASSWORD: 'Вы ввели неправильный email или пароль',
}






