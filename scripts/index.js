const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

const popupEditProfile = document.querySelector('.popup');
const popupEditProfileInputName = popupEditProfile.querySelector('.input[name=profileName]');
const popupEditProfileInputJob = popupEditProfile.querySelector('.input[name=profileJob]');
const popupEditProfileBtnClose = popupEditProfile.querySelector('.popup__btn-close');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__container');

function toggleVisibilityEditForm() { 
  popupEditProfile.classList.toggle('popup_opened');
}

function saveInInputProfileEditForm() {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputJob.value = profileSubtitle.textContent;
}

function saveProfile() {
  profileName.textContent = popupEditProfileInputName.value;
  profileSubtitle.textContent = popupEditProfileInputJob.value;
}

function openPopupEditProfile() {
  
  if( popupEditProfile.classList.contains('popup_opened') ) {
    saveInInputEditForm();
  } else {
    saveInInputProfileEditForm();
    toggleVisibilityEditForm();
  } 
}

function closePopupEditProfile() {
  
  if( popupEditProfile.classList.contains('popup_opened') ) {
    toggleVisibilityEditForm();
  }  
}

function handleEditProfileFormSubmit(event) {
 
  event.preventDefault();
  saveProfile();
  closePopupEditProfile();
}

profileBtnEdit.addEventListener('click', openPopupEditProfile);
popupEditProfileBtnClose.addEventListener('click', closePopupEditProfile);
popupEditProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

