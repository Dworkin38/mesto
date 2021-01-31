import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._btnSubmit = this._popup.querySelector('.popup__btn-form');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupValues = {};

    this._inputList.forEach(input => {
      this._popupValues[input.name] = input.value;
    });

    return this._popupValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__container');
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._getInputValues();
      this._handlerSubmit(this._popupValues)
    });
  }

  close() {
    this._popupForm.reset();
    this._btnSubmit.classList.add('popup__btn-form_invalid');
    super.close();
  }
}