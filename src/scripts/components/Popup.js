export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if ((event.key === 'Escape')) this.close();
  }

  setEventListeners() {
    const popupBtnClose = this._popup.querySelector('.popup__btn-close');
    popupBtnClose.addEventListener('click', () => this.close());
  }
}