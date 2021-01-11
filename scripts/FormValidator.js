export class FormValidator {
  constructor(classListForm, formElement) {
    this._classListForm = classListForm;
    this._formElement = formElement;
  }

  enableValidation() {
    const popupFormList = Array.from(document.querySelectorAll(this._classListForm.formSelector));
  
    popupFormList.forEach((popupFormElement) => {
  
      popupFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      const formElement = new FormValidator(this._classListForm, popupFormElement);
      formElement._setEventListenersPopupInput();
    });
  };

  _setEventListenersPopupInput() {
    const popupInputList = Array.from(this._formElement.querySelectorAll(this._classListForm.inputSelector));
    const popupSubmitBtn = this._formElement.querySelector(this._classListForm.submitButtonSelector);

    popupInputList.forEach((popupInputElement) => {
      popupInputElement.addEventListener('input', () => {
        this._checkPopupInputValidity(popupInputElement);
        this._toggleBtnPopupFormState(this._isValidForm(), popupSubmitBtn);
      });
    });
  }

  _checkPopupInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleBtnPopupFormState(formValidity, formBtn) {
    if(formValidity) {
      formBtn.disabled = false;
      formBtn.classList.remove(this._classListForm.inactiveButtonClass);
    } else {
      formBtn.disabled = true;
      formBtn.classList.add(this._classListForm.inactiveButtonClass);
    }
  }

  _isValidForm() {
    return this._formElement.checkValidity();
  }

  _showInputError(inputElement, errorMessage) {
    const errorMassage = this._formElement.querySelector(`#${inputElement.name}-error`);
  
    inputElement.classList.add(this._classListForm.inputErrorClass);
    errorMassage.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorMassage = this._formElement.querySelector(`#${inputElement.name}-error`);
  
    inputElement.classList.remove(this._classListForm.inputErrorClass);
    errorMassage.textContent = ''
  }
}

