class MoviesApi {
    constructor(config) {
        this._urlMovies = config.urlMovies;
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

    getInitialMovies() {
        return this._request(`${this._urlMovies}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export const apiMovies = new MoviesApi({
    urlMovies: 'https://api.nomoreparties.co/beatfilm-movies',
});