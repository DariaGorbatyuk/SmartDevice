'use strict';
const body = document.querySelector('body');
const modalTemplate = document.querySelector('#modal').content.querySelector('.modal');
const newModal = modalTemplate.cloneNode(true);
const openModalBtn = body.querySelector('.header__link-modal');
const form = newModal.querySelector('.modal__form');

let isStorageSupport = true;
let storageSupportName;
let storageSupportTel;
let storageSupportMessage;

try {
  storageSupportName = localStorage.getItem('name');
  storageSupportTel = localStorage.getItem('tel');
  storageSupportMessage = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
}

function onCloseModal(evt) {
  if (evt.key !== 'Escape' && !evt.target.classList.contains('modal__close') && !evt.target.classList.contains('modal')) {
    return;
  }
  evt.preventDefault();
  newModal.remove();
  document.removeEventListener('keydown', onCloseModal);
}

function onOpenModal(evt) {
  evt.preventDefault();
  body.insertAdjacentElement('afterbegin', newModal);
  newModal.querySelector('.modal__close').addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onCloseModal);
  newModal.addEventListener('click', onCloseModal);
  const name = newModal.querySelector('#name-m');
  const tel = newModal.querySelector('#tel-m');
  const message = newModal.querySelector('#text-m');
  name.focus();
  tel.addEventListener('focus', onTelChange)
  tel.addEventListener('input', onTelChange);
  if (isStorageSupport) {
    name.value = storageSupportName;
    tel.value = storageSupportTel;
    message.value = storageSupportMessage;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (isStorageSupport) {
    localStorage.setItem('name', newModal.querySelector(`#name-m`).value);
    localStorage.setItem('tel', newModal.querySelector(`#tel-m`).value);
    localStorage.setItem('message', newModal.querySelector(`#text-m`).value);
  }
  newModal.remove();
}
function onTelChange(event) {
  const template = /^\+7\([0-9]{3}\)[0-9]{7}/;
  this.addEventListener('keypress', e => {
    // Отменяем ввод не цифр
    if (!/\d/.test(e.key))
      e.preventDefault();
  });
  if (this.value.length === 0) {
    this.value = '+7('
  } else if (this.value.length === 6) {
    this.value = `${this.value})`;
  }
  if (!template.test(this.value)) {
    this.setCustomValidity('Пример: +7(9xx)xxxxxxx');
  } else {
    this.setCustomValidity('');
  }
}

openModalBtn.addEventListener('click', onOpenModal);
form.addEventListener('submit', onFormSubmit)
