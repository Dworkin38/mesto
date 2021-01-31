import Card from './components/Card.js';
import Section from './components/Section.js';
import { initialCards, classListForm } from './utils/data.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import './pages/index.css';

const btnAddCard = document.querySelector('.profile__btn-add');
const btnEditProfile = document.querySelector('.profile__btn-edit');

const user = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__subtitle'});

const popupImg = new PopupWithImage('.popup_type_img');
popupImg.setEventListeners();

const renderCards = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card(item, '#card', (imgLink, imgName) => popupImg.open(imgLink, imgName));
    renderCards.addItem(card.generateCard());
  }
}, '.cards');
renderCards.rendererItems();

const popupAddCard = new PopupWithForm('.popup_name_cardAdd', (popupValues) => {
  const card = new Card({ name: popupValues['cardTitle'], link: popupValues['cardLink'] }, '#card', (imgLink, imgName) => popupImg.open(imgLink, imgName));
  renderCards.addItem(card.generateCard());
  popupAddCard.close();
});
const popupEditProfile = new PopupWithForm('.popup_name_profileEdit', (popupValues) => {
  user.setUserInfo(popupValues['profileName'], popupValues['profileJob']);
  popupEditProfile.close();
});
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

const handlerBtnAddCard = () => {
  popupAddCard.open();
}
const handlerBtnEditProfile = () => {
  popupEditProfile.open();
}

btnAddCard.addEventListener('click', handlerBtnAddCard);
btnEditProfile.addEventListener('click', handlerBtnEditProfile);

const validator = new FormValidator(classListForm, '');
validator.enableValidation();