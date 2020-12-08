const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileBtnAddCard = profile.querySelector('.profile__btn-add');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_type_img');

const popupAddCard = document.querySelector('.popup_name_cardAdd');
const popupCardTitle = popupAddCard.querySelector('.popup__input_type_card-title');
const popupCardLink = popupAddCard.querySelector('.popup__input_type_card-link');

const popupEditProfile = document.querySelector('.popup_name_profileEdit');
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
  const cardBtnLike = cardTemplate.querySelector('.cards__btn-like');
  const cardBtnDelete = cardTemplate.querySelector('.cards__btn-trash')

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  cardBtnLike.addEventListener('click', toggleLike);
  cardBtnDelete.addEventListener('click', deleteCard);
  cardImg.addEventListener('click', openPopup);

  return cardTemplate;
}

function addCard(card) {
  cardsSection.prepend(createCard(card));
}

function renderCards(...initialCards) {
  initialCards.map( card => addCard(card));
}

function toggleLike(event) {
  event.target.closest('.cards__btn-like').classList.toggle('cards__btn-like_active');
}

function deleteCard(event) {
  event.target.closest('.cards__item').remove();
}

function closePopup(event) {
  const popup = event.target.closest('.popup');
  if(popup.classList.contains('popup_name_cardAdd')) {
    popupCardTitle.value = '';
    popupCardLink.value = '';
  }
  popup.classList.toggle('popup_opened');
}

function createNewCard() {
  const cardElement = {};

  cardElement.name = popupCardTitle.value;
  cardElement.link = popupCardLink.value;

  renderCards(cardElement);
}

function saveProfile() { 
  profileName.textContent = popupEditProfileInputName.value;
  profileSubtitle.textContent = popupEditProfileInputJob.value;
}

// метод Делегирование событий

function openPopup(event) {

  if(event.target.closest('.cards__item-img')) {
    const imgTargetElement = event.target.closest('.cards__item-img');
    const popupImg = popupImgView.querySelector('.popup__img');
    const popupImgCaption = popupImgView.querySelector('.popup__caption');

    popupImg.src = imgTargetElement.src;
    popupImg.alt = imgTargetElement.alt;
    popupImgCaption.textContent = imgTargetElement.alt;

    popupImgView.classList.toggle('popup_opened');
  }

  if(event.target.closest('.profile__btn-add')) popupAddCard.classList.toggle('popup_opened');

  if(event.target.closest('.profile__btn-edit')) { 
    popupEditProfile.classList.toggle('popup_opened');
  
    if( popupEditProfile.classList.contains('popup_opened') === true ) {
      popupEditProfileInputName.value = profileName.textContent;
      popupEditProfileInputJob.value = profileSubtitle.textContent;
    }
  }
}

function handlerPopup(event) {
  if(event.target.closest('.popup__btn-close') || event.target.classList.contains('popup')) closePopup(event);
}

function handlerPopupBtn(event) {
  event.preventDefault();

  if(event.target.closest('.popup_name_profileEdit')) saveProfile();
  if(event.target.closest('.popup_name_cardAdd')) createNewCard();

  closePopup(event);
}

renderCards(...initialCards);

profileBtnEdit.addEventListener('click', openPopup);
profileBtnAddCard.addEventListener('click', openPopup);

popupImgView.addEventListener('click', handlerPopup); 
popupAddCard.addEventListener('click', handlerPopup); 
popupEditProfile.addEventListener('click', handlerPopup);

popupAddCard.addEventListener('submit', handlerPopupBtn); 
popupEditProfile.addEventListener('submit', handlerPopupBtn); 