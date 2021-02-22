'use strict';
const body = document.querySelector('body');
const modalTemplate = document.querySelector('#modal').content.querySelector('.modal');
const newModal = modalTemplate.cloneNode(true);
//const closeModalBtn = newModal.querySelector('.modal__close');
const openModalBtn = body.querySelector('.header__link-modal');

function onCloseModal(evt) {
  evt.preventDefault();
  console.log(evt.target);
  if (evt.key !== 'Escape' && !evt.target.classList.contains('modal__close') && !evt.target.classList.contains('modal')) {
    return;
  }
  newModal.remove();
}

function onOpenModal(evt) {
  evt.preventDefault();
  body.insertAdjacentElement('afterbegin', newModal);
  newModal.querySelector('.modal__close').addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onCloseModal);
  newModal.addEventListener('click',onCloseModal)
}


openModalBtn.addEventListener('click', onOpenModal);

