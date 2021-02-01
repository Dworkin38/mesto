import Section from '../components/Section.js';
import { initialCards, classListForm } from '../utils/data.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import './index.css';

const btnAddCard = document.querySelector('.profile__btn-add');
const btnEditProfile = document.querySelector('.profile__btn-edit');

const createCard = (data) => new Card(data, '#card', (imgLink, imgName) => popupImg.open(imgLink, imgName));

const user = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__subtitle'});

const popupImg = new PopupWithImage('.popup_type_img');
popupImg.setEventListeners();

const renderCards = new Section({
  items: initialCards, renderer: (item) => {
    const card = createCard(item);
    renderCards.addItem(card.generateCard(), 'append');
  }
}, '.cards');
renderCards.rendererItems();

const popupAddCard = new PopupWithForm('.popup_name_cardAdd', (popupValues) => {
  const card = createCard({ name: popupValues['cardTitle'], link: popupValues['cardLink'] });
  renderCards.addItem(card.generateCard(), 'prepend');
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
  popupEditProfile.setInputValues( user.getUserInfo() );
  popupEditProfile.open();
}

btnAddCard.addEventListener('click', handlerBtnAddCard);
btnEditProfile.addEventListener('click', handlerBtnEditProfile);

const formValidatorProfile = new FormValidator(classListForm, 'popup_name_profileEdit');
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(classListForm, 'popup_name_cardAdd');
formValidatorCard.enableValidation();