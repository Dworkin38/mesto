const profile = document.querySelector('.profile');
const profileBtnEdit = profile.querySelector('.profile__btn-edit');
const profileName = profile.querySelector('.profile__name');
const profileSubtitle = profile.querySelector('.profile__subtitle');

const popupEditProfile = document.querySelector('.popup');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileInputJob = popupEditProfile.querySelector('.popup__input_type_job');
const popupEditProfileBtnClose = popupEditProfile.querySelector('.popup__btn-close');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__container');

function toggleVisibilityEditForm() {   

  if( popupEditProfile.classList.toggle('popup_opened') ) {
    popupEditProfileInputName.value = profileName.textContent;
    popupEditProfileInputJob.value = profileSubtitle.textContent;
  } 
}

function saveProfile() { 
  profileName.textContent = popupEditProfileInputName.value;
  profileSubtitle.textContent = popupEditProfileInputJob.value;
}

function handleEditProfileFormSubmit(event) { 
  event.preventDefault();
  saveProfile();
  toggleVisibilityEditForm();
}

profileBtnEdit.addEventListener('click', toggleVisibilityEditForm);
popupEditProfileBtnClose.addEventListener('click', toggleVisibilityEditForm);
popupEditProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

