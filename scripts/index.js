export {openPopup, handlerKeydownPopup};
import {Card} from './Card.js';
import {initialCards, classListForm} from './data.js';
import {FormValidator} from './FormValidator.js';

const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileBtnAddCard = profile.querySelector('.profile__btn-add');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

export const popupImgView = document.querySelector('.popup_type_img');

const popupAddCard = document.querySelector('.popup_name_cardAdd');
const popupAddCardForm = popupAddCard.querySelector('.popup__container');
const popupCardTitle = popupAddCard.querySelector('.popup__input_type_card-title');
const popupCardLink = popupAddCard.querySelector('.popup__input_type_card-link');
const popupAddCardBtn = popupAddCard.querySelector('.popup__btn-form');

const popupEditProfile = document.querySelector('.popup_name_profileEdit');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_profile-name');
const popupEditProfileInputJob = popupEditProfile.querySelector('.popup__input_type_profile-job');

const cardsSection = document.querySelector('.cards');

function addCard(data) {
  const card = new Card(data, '#card');
  cardsSection.prepend(card.generateCard());
}

function renderCards(...initialCards) {
  initialCards.map( card => addCard(card));
}

function createNewCard() {
  const cardElement = {};

  cardElement.name = popupCardTitle.value;
  cardElement.link = popupCardLink.value;

  popupAddCardBtn.classList.add(classListForm.inactiveButtonClass);
  addCard(cardElement);
}

function saveProfile() { 
  profileName.textContent = popupEditProfileInputName.value;
  profileSubtitle.textContent = popupEditProfileInputJob.value;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerKeydownPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlerKeydownPopup);
}

// Обработчики событий

function handlerBtnEditProfile() {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputJob.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

// Исправлен баг если пользователь ввел валидные данные затем закрыл popup

function handlerBtnAddCard() {
  popupAddCardForm.reset();
  popupAddCardBtn.classList.add(classListForm.inactiveButtonClass);
  openPopup(popupAddCard);
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

const validator = new FormValidator(classListForm, '');

validator.enableValidation();