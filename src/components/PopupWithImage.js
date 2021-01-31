import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(srcImg, captionImg) {
    const popupImg = this._popup.querySelector('.popup__img');
    const popupImgCaption = this._popup.querySelector('.popup__caption');

    popupImg.src = srcImg;
    popupImg.alt = captionImg;
    popupImgCaption.textContent = captionImg;
    super.open();
  }
}