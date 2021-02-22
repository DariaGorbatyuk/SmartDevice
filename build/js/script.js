'use strict';
const body = document.querySelector('body');
const modalTemplate = document.querySelector('#modal').content.querySelector('.modal');
const newModal = modalTemplate.cloneNode(true);
const openModalBtn = body.querySelector('.header__link-modal');

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
  name.focus();
}


openModalBtn.addEventListener('click', onOpenModal);

