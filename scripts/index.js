const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_type_img');

const popupAddCard = document.querySelector('form[name="cardAdd"]').closest('.popup');
const popupCardTitle = popupAddCard.querySelector('.popup__input_type_card-title');
const popupCardLink = popupAddCard.querySelector('.popup__input_type_card-link');

const popupEditProfile = document.querySelector('form[name="profileEdit"]').closest('.popup');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_profile-name');
const popupEditProfileInputJob = popupEditProfile.querySelector('.popup__input_type_profile-job');



const cardsSection = document.querySelector('.cards');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1605639743310-db006cc1b95a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(card) {
  const cardTemplate = document.querySelector('#card').content.cloneNode(true);
  const cardTitle = cardTemplate.querySelector('.cards__item-title');
  const cardImg = cardTemplate.querySelector('.cards__item-img');
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  return cardTemplate;
}

function addCards(...cardElements) {
  cardElements.forEach( cardElement => cardsSection.prepend(cardElement) )
}

function renderCards(...initialCards) {
  const cardElements = initialCards.map( card => createCard(card))
  addCards(...cardElements);
}

function createPopup({form, title, input}) {
  const popupTemplate = document.querySelector('#popup').content.cloneNode(true);

  const popupForm = popupTemplate.querySelector('.popup__container');
  popupForm

}

function toggleLike(event) {
  event.target.closest('.cards__btn-like').classList.toggle('cards__btn-like_active');
}

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

function openPopupImg(event) {
  const imgTargetElement = event.target.closest('.cards__item-img');
  const popupImg = popupImgView.querySelector('.popup__img');
  const popupImgCaption = popupImgView.querySelector('.popup__caption');
  popupImg.src = imgTargetElement.src;
  popupImg.alt = imgTargetElement.alt;
  popupImgCaption.textContent = imgTargetElement.alt;
  popupImgView.classList.toggle('popup_opened');
}

function closePopup(event) {
  const popup = event.target.closest('.popup');
  popup.classList.toggle('popup_opened');
}

function openPopupAddCard(event) {
  popupAddCard.classList.toggle('popup_opened');
}

function createNewCard() {
  const cardElement = {};
  cardElement.name = popupCardTitle.value;
  cardElement.link = popupCardLink.value;
  renderCards(cardElement);
}

function openPopupEditForm() {   
  popupEditProfile.classList.toggle('popup_opened');

  if( popupEditProfile.classList.contains('popup_opened') === true ) {
    popupEditProfileInputName.value = profileName.textContent;
    popupEditProfileInputJob.value = profileSubtitle.textContent;
  }
}

function saveProfile() { 
  profileName.textContent = popupEditProfileInputName.value;
  profileSubtitle.textContent = popupEditProfileInputJob.value;
}

// метод Делегирование событий

function handlerCards(event) {
  if(event.target.closest('.cards__btn-like')) toggleLike(event);
  if(event.target.closest('.cards__btn-trash')) deleteCard(event);
  if(event.target.closest('.cards__item-img')) openPopupImg(event);
}

function handlerProfile(event) {
  if(event.target.closest('.profile__btn-edit')) openPopupEditForm();
  if(event.target.closest('.profile__btn-add')) openPopupAddCard(event);
}

function handlerPopupImgView(event) {
  if(event.target.closest('.popup__btn-close')) closePopup(event);
  if(event.target.classList.contains('popup')) closePopup(event);
}

function handlerPopupAddCard(event) {
  if(event.target.closest('.popup__btn-close')) closePopup(event);
  if(event.target.closest('.popup__btn-form')) {
    event.preventDefault();
    createNewCard();
    closePopup(event);
  }
}

function handlerPopupEditForm(event) {
  if(event.target.closest('.popup__btn-close')) closePopup(event);
  if(event.target.closest('.popup__btn-form')) {
    event.preventDefault();
    saveProfile();
    closePopup(event);
  }
}

renderCards(...initialCards);
cardsSection.addEventListener('click', handlerCards);
profile.addEventListener('click', handlerProfile);
popupImgView.addEventListener('click', handlerPopupImgView);
popupAddCard.addEventListener('click', handlerPopupAddCard);
popupEditProfile.addEventListener('click', handlerPopupEditForm)