 class Api {
    constructor (config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject("Произошла ошибка");
    }

    getInitialCards () {
        return fetch (`${this._url}${'cards'}`, {
            method: "GET",
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getUserInfo () {
        return fetch(`${this._url}${'users/me'}`, {
            method: "GET",
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getAllNeededData () {
        return Promise.all([this.getUserInfo(),this.getInitialCards()])
    }

    addCard (data) {
        return fetch (`${this._url}${'cards'}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}${'cards/'}${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    addUserInfo (data) {
        return fetch(`${this._url}${'users/me'}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    addAvatar (data) {
        return fetch(`${this._url}${'users/me/avatar'}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }

    likeCard(id) {
        return fetch(`${this._url}${'cards/likes/'}${id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    removeLikeCard(id) {
        return fetch(`${this._url}${'cards/likes/'}${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }
}

const api = new Api ({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: "91c2835b-f41e-43e9-bed7-ea071878b36c",
        "Content-Type": "application/json"
    }


});

export default api