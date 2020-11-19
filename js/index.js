const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileBtnEdit = document.querySelector('.profile__btn-edit');
const popupInputName = document.querySelector('.popup__input-name');
const popupInputJob = document.querySelector('.popup__input-job');

function toggleVisibilityEditForm() {
  const popupEditProfile = document.querySelector('.popup');
  
  profileBtnEdit.classList.toggle('btn_hover');
  popupEditProfile.classList.toggle('popup_opened');
}

function saveInInputEditForm() {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileSubtitle.textContent;
}

function saveProfile() {
  profileName.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputJob.value;
}

function handleEditProfileFormSubmit(event) {
  event.preventDefault();
  saveProfile();
  toggleVisibilityEditForm();
}

function renderPopupEditForm() {
  const popupBtnClose = document.querySelector('.popup__btn-close');
  const popupEditProfileForm = document.querySelector('.popup__container');

  toggleVisibilityEditForm();
  saveInInputEditForm();
  popupBtnClose.addEventListener('click', toggleVisibilityEditForm);
  popupEditProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
}

profileBtnEdit.addEventListener('click', renderPopupEditForm);

