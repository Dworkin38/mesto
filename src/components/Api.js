const handlerErrorApi = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor(options) {
    this.options = JSON.parse(JSON.stringify(options));
  }

  getProfile() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        authorization: this.options.headers['authorization']
      }
    })
      .then(handlerErrorApi)
  }

  editProfile(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.headers['authorization'],
        'Content-Type': this.options.headers['Content-Type']
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(handlerErrorApi)    
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: {
        authorization: this.options.headers['authorization']
      }
    })
      .then(handlerErrorApi)    
  }

  addCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.options.headers['authorization'],
        'Content-Type': this.options.headers['Content-Type']
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(handlerErrorApi)     
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.options.headers['authorization']
      }
    })
      .then(handlerErrorApi)
  }

  addlikeCard(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.options.headers['authorization']
      }
    })
      .then(handlerErrorApi)
  }

  removelikeCard(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.options.headers['authorization']
      }
    })
      .then(handlerErrorApi)
  }

  editAvatar(link) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.headers['authorization'],
        'Content-Type': this.options.headers['Content-Type']
      },
      body: JSON.stringify({avatar: link})
    })
      .then(handlerErrorApi)
  }
}