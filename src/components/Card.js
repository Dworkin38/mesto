export default class Card {
  constructor(data ,cardSelector, handleCardClick) {
    this._imgLink = data.link;
    this._imgName = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.cards__item-img');
    this._setEventListener();

    this._element.querySelector('.cards__item-title').textContent = this._imgName;
    cardImg.src = this._imgLink;
    cardImg.alt = this._imgName;

    return this._element;
  }

  _setEventListener() {
    this._like = this._element.querySelector('.cards__btn-like');
    this._trash = this._element.querySelector('.cards__btn-trash');

    this._element.querySelector('.cards__item-img').addEventListener('click', () => this._handleCardClick(this._imgLink, this._imgName));
    this._like.addEventListener('click', () => this._toggleLike());
    this._trash.addEventListener('click', () => this._deleteCard());
  }

  _toggleLike() {
    this._like.classList.toggle('cards__btn-like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}