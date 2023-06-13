
import { useState } from "react";

export function filterMovies( movies, keyword ) {

  return (movies.filter(movie => movie.nameRU.includes(keyword.movie)))
}

export const validName = /^[а-яёa-z]+(?:[-]{1}[а-яёa-z]*)?$/i;
export const validEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;






