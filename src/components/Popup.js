let handleEscCloseBind;

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', handleEscCloseBind = this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', handleEscCloseBind);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if ((event.key === 'Escape')) this.close();
  }

  _handleClickClose(event) {
    if ((event.target === this._popup) || (event.target.closest('.popup__btn-close'))) this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => this._handleClickClose(evt));
  }
}