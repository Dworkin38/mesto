export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(valueForm = null) {
    this.valueForm = valueForm;
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
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