export default class Card {
  constructor(data ,cardSelector, handler) {
    this._imgLink = data.imgLink;
    this._imgName = data.imgName;
    this._likesArray = data.likesArray;
    this._cardId = data.cardId;
    this._ownerId = data.ownerId;

    this._cardSelector = cardSelector;

    this._handlerCardImgClick = handler.cardImgClick;
    this._handlerCardDeleteClick = handler.cardDeleteClick;
    this._handlerCardLikeClick = handler.cardLikeClick;

    this._likeState = false;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.cards__item').cloneNode(true);

    return cardElement;
  }

  getIdCard() {
    return this._cardId;
  }

  getLikeState() {
    return this._likeState;
  }

  getLikesArray() {
    return this._likesArray;
  }

  setlikesArray(likesArray) {
    this._likesArray = likesArray;
    this._likeCount.textContent = this._likesArray.length;
  }

  generateCard(userId = null) {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.cards__item-img');
    this._likeBtn = this._element.querySelector('.cards__btn-like');
    this._trash = this._element.querySelector('.cards__btn-trash');
    this._likeCount = this._element.querySelector('.cards__like-count');
    this._element.querySelector('.cards__item-title').textContent = this._imgName;
    this._cardImg.src = this._imgLink;
    this._cardImg.alt = this._imgName;
    
    this._likeState = this._likesArray.some(userLike => userLike._id === userId);
    this._likeState ? this.toggleLike(this._likesArray, true) : this._likeCount.textContent = this._likesArray.length;
    this._setEventListener(userId);

    return this._element;
  }

  _setEventListener(userId) {
    this._element.querySelector('.cards__item-img').addEventListener('click', () => this._handlerCardImgClick(this._imgLink, this._imgName));
    this._likeBtn.addEventListener('click', () => this._handlerCardLikeClick());
    
    if(userId === this._ownerId) { 
      this._trash.addEventListener('click', () => {
        this._handlerCardDeleteClick();
      });
    } else {
      this._trash.remove();
      this._trash = null;
    } 
  }

  toggleLike(likes, initial = false) {
    this._likeBtn.classList.toggle('cards__btn-like_active');
    this._likesArray = likes;
    this._likeCount.textContent = this._likesArray.length;
    initial ? this._likeState = true : this._likeState = !this._likeState;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}