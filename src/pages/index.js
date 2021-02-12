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

//Получение информации профиля

api.getProfile()
  .then(res => {
    user.setUserInfo(
      {
        userId: res._id,
        userName: res.name,
        userInfo: res.about,
        userAvatarLink: res.avatar,
      }
    );

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
        cardDeleteClick: function () {
          popupCardDeleteConfirm.setValidBtnSubmit();
          popupCardDeleteConfirm.open(this);
        },
        cardLikeClick: function () {
          const handlerErrorClick = (err) => {
            this.toggleLike(this.getLikesArray());
            console.log(err);
          }

          if(this.getLikeState()) {
            this.toggleLike(this.getLikesArray());
            api.removelikeCard(this.getIdCard())
              .then(res => this.setlikesArray(res.likes))
              .catch(handlerErrorClick);
          } else {
            this.toggleLike(this.getLikesArray());
            api.addlikeCard(this.getIdCard())
              .then(res => this.setlikesArray(res.likes))
              .catch(handlerErrorClick);
          }
        },
      }
    );
    
    //Инициализация карточек

    const renderCards = new Section({
      renderer: (item) => {
        const card = createCard(item);
        renderCards.addItem(card.generateCard(user.getUserId()), 'append');
      }
    }, '.cards');

    api.getInitialCards()
      .then(res => {
        renderCards.rendererItems(res);
      })
      .catch(err => console.log(err));
    
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
        })
        .catch(err => console.log(err))
        .finally(() => popupAddCard.addBtnStateDefault());
      popupAddCard.close();
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
        })
        .catch(err => console.log(err))
        .finally(() => popupEditProfile.addBtnStateDefault());
      popupEditProfile.close();
    });
    popupEditProfile.setEventListeners();

    //Popup редактирования аватара

    const popupEditAvatar = new PopupWithForm('.popup_name_avatarEdit', (popupValues) => {
      popupEditAvatar.addBtnStateLoad();
      api.editAvatar(popupValues['avatarLink'])
        .then(res => user.setUserInfo(
          {
            userId: res._id,
            userName: res.name,
            userInfo: res.about,
            userAvatarLink: res.avatar,
          }
        ))
        .catch(err => console.log(err))
        .finally(() => popupEditAvatar.addBtnStateDefault());
        popupEditAvatar.close();
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
    avatar.addEventListener('click', handlerAvatarEdit)
  })
  .catch(err => console.log(err));

  //Валидация форм

  const formValidatorProfile = new FormValidator(classListForm, 'popup_name_profileEdit');
  formValidatorProfile.enableValidation();

  const formValidatorCard = new FormValidator(classListForm, 'popup_name_cardAdd');
  formValidatorCard.enableValidation();

  const formValidatorAvatar = new FormValidator(classListForm, 'popup_name_avatarEdit');
  formValidatorAvatar.enableValidation();