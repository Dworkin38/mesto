import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupImgCaption = this._popup.querySelector('.popup__caption');
  }

  open(srcImg, captionImg) {
    this._popupImg.src = srcImg;
    this._popupImg.alt = captionImg;
    this._popupImgCaption.textContent = captionImg;
    super.open();
  }
}