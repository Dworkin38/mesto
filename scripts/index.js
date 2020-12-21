const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileBtnAddCard = profile.querySelector('.profile__btn-add');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_type_img');

const popupAddCard = document.querySelector('.popup_name_cardAdd');
const popupAddCardForm = popupAddCard.querySelector('.popup__container');
const popupCardTitle = popupAddCard.querySelector('.popup__input_type_card-title');
const popupCardLink = popupAddCard.querySelector('.popup__input_type_card-link');

const popupEditProfile = document.querySelector('.popup_name_profileEdit');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_profile-name');
const popupEditProfileInputJob = popupEditProfile.querySelector('.popup__input_type_profile-job');

const cardsSection = document.querySelector('.cards');

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
  cardImg.addEventListener('click', handlerClickImg);

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlerKeydownPopup);
}

// Обработчики событий

function handlerClickImg(event) {
  const imgTargetElement = event.target.closest('.cards__item-img');
  const popupImg = popupImgView.querySelector('.popup__img');
  const popupImgCaption = popupImgView.querySelector('.popup__caption');

  popupImg.src = imgTargetElement.src;
  popupImg.alt = imgTargetElement.alt;
  popupImgCaption.textContent = imgTargetElement.alt;
  openPopup(popupImgView);
  document.addEventListener('keydown', handlerKeydownPopup);
}

function handlerBtnEditProfile() {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputJob.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
  document.addEventListener('keydown', handlerKeydownPopup);
}

function handlerBtnAddCard() {
  popupAddCardForm.reset();
  openPopup(popupAddCard);
  document.addEventListener('keydown', handlerKeydownPopup);
}

function handlerKeydownPopup(event) {
  const popupOpen = document.querySelector('.popup_opened');
  if( (event.key === 'Escape') && (popupOpen) ) closePopup(popupOpen);
}

function handlerClickPopup(event) {

  if(event.target.closest('.popup__btn-close') || event.target.classList.contains('popup')) closePopup(event.target.closest('.popup'));
}

function handlerSubmitAddCard(event) {
  event.preventDefault();
  createNewCard();
  closePopup(popupAddCard);
}

function handlerSubmitEditProfile(event) {
  event.preventDefault();
  saveProfile();
  closePopup(popupEditProfile);
}

renderCards(...initialCards);

profileBtnEdit.addEventListener('click', handlerBtnEditProfile);
profileBtnAddCard.addEventListener('click', handlerBtnAddCard);

popupImgView.addEventListener('click', handlerClickPopup); 
popupAddCard.addEventListener('click', handlerClickPopup); 
popupEditProfile.addEventListener('click', handlerClickPopup);

popupAddCard.addEventListener('submit', handlerSubmitAddCard); 
popupEditProfile.addEventListener('submit', handlerSubmitEditProfile); 