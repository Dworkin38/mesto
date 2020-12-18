const classListForm = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-form',
  inactiveButtonClass: 'popup__btn-form_invalid',
  inputErrorClass: 'popup__input_validity_invalid',
}; 

const toggleBtnPopupFormState = (formValidity, formBtn, classListForm) => {
  if(formValidity) {
    formBtn.disabled = false;
    formBtn.classList.remove(classListForm.inactiveButtonClass);
  } else {
    formBtn.disabled = true;
    formBtn.classList.add(classListForm.inactiveButtonClass);
  }
}

const isValidForm = (formElement) => {
  return formElement.checkValidity();
}

const showInputError = (formElement, inputElement, errorMessage, classListForm) => {
  const errorMassage = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.add(classListForm.inputErrorClass);
  errorMassage.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, classListForm) => {
  const errorMassage = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.remove(classListForm.inputErrorClass);
  errorMassage.textContent = ''
}

const checkPopupInputValidity = (formElement, inputElement, classListForm) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classListForm);
  } else {
    hideInputError(formElement, inputElement, classListForm);
  }
};

const setEventListenersPopupInput = (formElement, classListForm) => {
  const popupInputList = Array.from(formElement.querySelectorAll(classListForm.inputSelector));
  const popupSubmitBtn = formElement.querySelector(classListForm.submitButtonSelector);

  popupInputList.forEach((popupInputElement) => {
    popupInputElement.addEventListener('input', () => {
      checkPopupInputValidity(formElement, popupInputElement, classListForm);
      toggleBtnPopupFormState(isValidForm(formElement), popupSubmitBtn, classListForm);
    });
  });
}

const enableValidation = (classListForm) => {
  const popupFormList = Array.from(document.querySelectorAll(classListForm.formSelector));

  popupFormList.forEach((popupFormElement) => {

    popupFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListenersPopupInput(popupFormElement, classListForm);
  });
};


enableValidation(classListForm);

// При открытии popup profile edit вставляется текс поэтому проверяю валидацию при открытии
document.addEventListener('click', function (evt)  {
  const popupOpen = document.querySelector('.popup_opened');

  if(popupOpen) {
    const popupSubmitBtn = popupOpen.querySelector(classListForm.submitButtonSelector);
    toggleBtnPopupFormState(isValidForm(popupOpen.querySelector(classListForm.formSelector)), popupSubmitBtn, classListForm);
  }
});
