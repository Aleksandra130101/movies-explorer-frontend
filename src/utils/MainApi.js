class MainApi {
    constructor(config) {
        this._urlMain = config.urlMain;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    register(name, email, password) {
        console.log(this._urlMain);
        return this._request(`${this._urlMain}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
    };

    authorize(email, password) {
        return this._request(`${this._urlMain}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
    }

    getContent(token) {
        return this._request(`${this._urlMain}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
    }

    createMovies(movie) {
        console.log(movie.image.url);
        const token = localStorage.getItem('token');
        console.log(token);
        return this._request(`${this._urlMain}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co/${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        })
    }

    getSavedMovies() {
        const token = localStorage.getItem('token');
        return this._request(`${this._urlMain}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
    }

    deleteMovie(idMovie) {
        const token = localStorage.getItem('token');
        return this._request(`${this._urlMain}/movies/${idMovie}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
    }

    updateProfile(user) {
        console.log(user);
        const token = localStorage.getItem('token');
        return this._request(`${this._urlMain}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        })
    }

}

export const apiMain = new MainApi({
    //urlMain: 'https://auth.nomoreparties.co',
    //urlMain: 'http://localhost:3001',
    urlMain: 'https://api.diplom.aad.nomoredomains.monster'
});