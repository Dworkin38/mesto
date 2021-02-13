import Section from '../components/Section.js';
import { classListForm, apiConfig } from '../utils/data.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import './index.css';

const api = new Api(apiConfig)

const user = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__subtitle', userAvatarSelector: '.profile__avatar' });
const btnAddCard = document.querySelector('.profile__btn-add');
const btnEditProfile = document.querySelector('.profile__btn-edit');
const avatar = document.querySelector('.profile__avatar-overlay');

//Функция создания карточки

const createCard = (data) => new Card(
  {
    imgLink: data.link,
    imgName: data.name,
    likesArray: data.likes,
    cardId: data._id,
    ownerId: data.owner._id,
  },
  '#card',
  {
    cardImgClick: (imgLink, imgName) => popupImg.open(imgLink, imgName),
    cardDeleteClick: function (card) {
      popupCardDeleteConfirm.setValidBtnSubmit();
      popupCardDeleteConfirm.open(card);
    },
    cardLikeClick: function (card) {
      const handlerErrorClick = (err) => {
        card.toggleLike(card.getLikesArray());
        console.log(err);
      }

      if (card.getLikeState()) {
        card.toggleLike(card.getLikesArray());
        api.removelikeCard(card.getIdCard())
          .then(res => card.setlikesArray(res.likes))
          .catch(handlerErrorClick);
      } else {
        card.toggleLike(card.getLikesArray());
        api.addlikeCard(card.getIdCard())
          .then(res => card.setlikesArray(res.likes))
          .catch(handlerErrorClick);
      }
    },
  }
);

//Класс рендера карточек

const renderCards = new Section({
  renderer: (item) => {
    const card = createCard(item);
    renderCards.addItem(card.generateCard(user.getUserId()), 'append');
  }
}, '.cards');

//Получение информации профиля и инициализация карточек 

Promise.all([
  api.getProfile(),
  api.getInitialCards(),
])
  .then(res => {
    user.setUserInfo(
      {
        userId: res[0]._id,
        userName: res[0].name,
        userInfo: res[0].about,
        userAvatarLink: res[0].avatar,
      }
    );
    renderCards.rendererItems(res[1]);
  })
  .catch(errors => errors.forEach((error) => console.log(error)));

//Popup подверждения удаления карточки   

const popupCardDeleteConfirm = new PopupWithForm('.popup_name_deleteConfirm', () => {
  popupCardDeleteConfirm.addBtnStateLoad();
  api.deleteCard(popupCardDeleteConfirm.valueForm.getIdCard())
    .then(() => {
      popupCardDeleteConfirm.valueForm.deleteCard();
      popupCardDeleteConfirm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupCardDeleteConfirm.popupCardDeleteConfirm());
});
popupCardDeleteConfirm.setEventListeners();

//Popup открытия картинки карточки 

const popupImg = new PopupWithImage('.popup_type_img');
popupImg.setEventListeners();

//Popup добавления карточек

const popupAddCard = new PopupWithForm('.popup_name_cardAdd', (popupValues) => {
  popupAddCard.addBtnStateLoad();
  api.addCard(popupValues['cardTitle'], popupValues['cardLink'])
    .then(res => {
      const card = createCard(res);
      renderCards.addItem(card.generateCard(user.getUserId()), 'prepend');
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddCard.addBtnStateDefault());
});
popupAddCard.setEventListeners();

//Popup редактирования профиля

const popupEditProfile = new PopupWithForm('.popup_name_profileEdit', (popupValues) => {
  popupEditProfile.addBtnStateLoad();
  api.editProfile(popupValues['profileName'], popupValues['profileJob'])
    .then(res => {
      user.setUserInfo(
        {
          userId: res._id,
          userName: res.name,
          userInfo: res.about,
          userAvatarLink: res.avatar,
        }
      );
      popupEditProfile.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditProfile.addBtnStateDefault());
});
popupEditProfile.setEventListeners();

//Popup редактирования аватара

const popupEditAvatar = new PopupWithForm('.popup_name_avatarEdit', (popupValues) => {
  popupEditAvatar.addBtnStateLoad();
  api.editAvatar(popupValues['avatarLink'])
    .then(res => {
      user.setUserInfo(
        {
          userId: res._id,
          userName: res.name,
          userInfo: res.about,
          userAvatarLink: res.avatar,
        }
      );
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.addBtnStateDefault());
});
popupEditAvatar.setEventListeners();

//Обработчики EventListener 

const handlerBtnAddCard = () => {
  popupAddCard.open();
}
const handlerBtnEditProfile = () => {
  popupEditProfile.setInputValues(user.getUserInfo());
  popupEditProfile.open();
}
const handlerAvatarEdit = () => {
  popupEditAvatar.open();
}

//Подключение EventListener

btnAddCard.addEventListener('click', handlerBtnAddCard);
btnEditProfile.addEventListener('click', handlerBtnEditProfile);
avatar.addEventListener('click', handlerAvatarEdit);


//Валидация форм

const formValidatorProfile = new FormValidator(classListForm, 'popup_name_profileEdit');
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(classListForm, 'popup_name_cardAdd');
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(classListForm, 'popup_name_avatarEdit');
formValidatorAvatar.enableValidation();