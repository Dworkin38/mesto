//Эти методы должны быть в классе Popup
import {openPopup, popupImgView} from './index.js'
export {Card}

class Card {
  constructor(data ,cardSelector) {
    this._imgLink = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.cards__item-img');
    this._setEventListener();

    this._element.querySelector('.cards__item-title').textContent = this._name;
    cardImg.src = this._imgLink;
    cardImg.alt = this._name;

    return this._element;
  }

  _setEventListener() {
    this._element.querySelector('.cards__item-img').addEventListener('click', (event) => this._handlerClickImg(event));
    this._element.querySelector('.cards__btn-like').addEventListener('click', (event) => this._toggleLike(event));
    this._element.querySelector('.cards__btn-trash').addEventListener('click', (event) => this._deleteCard(event));
  }

  _toggleLike(event) {
    event.target.closest('.cards__btn-like').classList.toggle('cards__btn-like_active');
  }

  _deleteCard(event) {
    event.target.closest('.cards__item').remove();
  }

  _handlerClickImg(event) {
    const popupImg = popupImgView.querySelector('.popup__img');
    const popupImgCaption = popupImgView.querySelector('.popup__caption');

    popupImg.src = this._imgLink;
    popupImg.alt = this._name;
    popupImgCaption.textContent = this._name;
    openPopup(popupImgView);
  }
}