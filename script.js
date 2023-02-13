'use strict';
const form = document.querySelector('.sign-up');
const fields = document.querySelectorAll('.input-field');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const eMail = document.getElementById('email');
const password = document.getElementById('password');

firstName.addEventListener('focusout', CheckfirstName);
lastName.addEventListener('focusout', CheckLastName);
eMail.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPassword);
form.addEventListener('submit', function (e) {
  validateInputs();
  if (![...fields].every(el => el.classList.contains('valid'))) {
    e.preventDefault();
  }
});

const validateInputs = function () {
  CheckfirstName();
  CheckLastName();
  checkEmail();
  checkPassword();
};

const emailValidation = function (email) {
  const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return pattern.test(email.toLowerCase());
};
const passwordValidation = function (password) {
  const pattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])(?=.*[0-9])(?=.{8,})/;
  return pattern.test(String(password));
};
const setError = function (element, message) {
  const inputField = element.parentElement;
  const displayError = inputField.querySelector('.error');
  displayError.innerHTML = `<p>${message}</p>`;
  inputField.classList.add('error');
  inputField.classList.remove('valid');
};

const setSuccess = function (element) {
  const inputField = element.parentElement;
  const displayError = inputField.querySelector('.error');
  displayError.innerHTML = '';
  inputField.classList.add('valid');
  inputField.classList.remove('error');
};

function CheckfirstName() {
  const firstNameValue = firstName.value.trim();
  if (!firstNameValue) {
    setError(firstName, 'First Name cannot be empty');
  } else {
    setSuccess(firstName);
  }
}
function CheckLastName() {
  const lastNameValue = lastName.value.trim();
  if (!lastNameValue) {
    setError(lastName, 'Last Name cannot be empty');
  } else {
    setSuccess(lastName);
  }
}
function checkEmail() {
  const eMailValue = eMail.value.trim();
  if (!eMailValue) {
    setError(eMail, 'Email Address cannot be empty');
  } else if (!emailValidation(eMailValue)) {
    eMail.placeholder = 'e.g. "random@email.com" ';
    eMail.value = '';
    setError(eMail, 'Looks like this is not an email');
  } else {
    setSuccess(eMail);
  }
}
function checkPassword() {
  const passwordValue = password.value.trim();
  if (!passwordValue) {
    setError(password, 'Password cannot be empty');
  } else if (!passwordValidation(passwordValue)) {
    password.placeholder = 'e.g. "m#P52s@ap$V" ';
    password.value = '';
    setError(
      password,
      'Password must have a minimum of 8 characters and contain at least one upper case letter, one lower case letter, one number and one special character'
    );
  } else {
    setSuccess(password);
  }
}
