export default class FormValidator {
  constructor(classListForm, selectorFormElement) {
    this._classListForm = classListForm;
    this._formElement = document.querySelector(`.${selectorFormElement}`).querySelector(classListForm.formSelector);
  }

  enableValidation() {
    const formInputList = Array.from(this._formElement.querySelectorAll(this._classListForm.inputSelector));
    const formSubmitBtn = this._formElement.querySelector(this._classListForm.submitButtonSelector);
    this._formElement.addEventListener('submit', (event) => event.preventDefault()); 
   
    
    this._toggleBtnPopupFormState(this._isValidForm(), formSubmitBtn);
    formInputList.forEach((formInputElement) => {
      formInputElement.addEventListener('input', () => {
        this._checkPopupInputValidity(formInputElement);
        this._toggleBtnPopupFormState(this._isValidForm(), formSubmitBtn);
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

