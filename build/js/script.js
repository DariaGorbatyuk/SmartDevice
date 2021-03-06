'use strict';
(function () {
  var MEDIUM_WIDTH = 768;
  var body = document.querySelector('body');
  var modalTemplate = document.querySelector('#modal').content.querySelector('.modal');
  var newModal = modalTemplate.cloneNode(true);
  var openModalBtn = body.querySelector('.header__link-modal');
  var modalForm = newModal.querySelector('.modal__form');
  var questionsForm = document.querySelector('.question__form ');
  var questionsTel = questionsForm.querySelector('#tel');
  var questionsName = questionsForm.querySelector('#name');
  var questionsMessage = questionsForm.querySelector('#text');
  var detailsNav = document.querySelector('.footer__nav details');
  var detailsContact = document.querySelector('.footer__contacts details');
  var lastLength = 2;


  if (document.documentElement.clientWidth < MEDIUM_WIDTH) {
    detailsNav.removeAttribute('open');
  }

  var isStorageSupport = true;
  var storageSupportName;
  var storageSupportTel;
  var storageSupportMessage;

  try {
    storageSupportName = localStorage.getItem('name');
    storageSupportTel = localStorage.getItem('tel');
    storageSupportMessage = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  function setStorage(name, tel, message) {
    if (isStorageSupport) {
      name.value = storageSupportName;
      tel.value = storageSupportTel;
      message.value = storageSupportMessage;
    }
  }

  function onCloseModal(evt) {
    if (evt.key !== 'Escape' && !evt.target.classList.contains('modal__close') && !evt.target.classList.contains('modal')) {
      return;
    }
    evt.preventDefault();
    body.classList.remove('overflow');
    newModal.remove();
    document.removeEventListener('keydown', onCloseModal);
  }

  function onOpenModal(evt) {
    evt.preventDefault();
    body.insertAdjacentElement('afterbegin', newModal);
    body.classList.add('overflow');
    newModal.querySelector('.modal__close').addEventListener('click', onCloseModal);
    document.addEventListener('keydown', onCloseModal);
    newModal.addEventListener('click', onCloseModal);
    var name = newModal.querySelector('#name-m');
    var tel = newModal.querySelector('#tel-m');
    var message = newModal.querySelector('#text-m');
    name.focus();
    tel.addEventListener('focus', onTelChange);
    tel.addEventListener('input', onTelChange);
    name.addEventListener('input', onNameChange);
    setStorage(name, tel, message);
  }


  function onFormSubmit(evt) {
    evt.preventDefault();
    if (!evt.currentTarget.querySelector('input[name="agree"]').checked) {
      return;
    }
    if (isStorageSupport) {
      localStorage.setItem('name', evt.currentTarget.querySelector('input[name="name"]').value);
      localStorage.setItem('tel', evt.currentTarget.querySelector('input[name="tel"]').value);
      localStorage.setItem('message', evt.currentTarget.querySelector('textarea[name="text"]').value);
    }
    evt.currentTarget.submit();
    if (newModal) {
      newModal.remove();
    }
  }


  function onTelChange(evt) {
    var template = /^\+7\([0-9]{3}\)[0-9]{7}/;
    evt.currentTarget.addEventListener('keypress', function (e) {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
    if (evt.currentTarget.value.length === 0) {
      evt.currentTarget.value = '+7(';
    } else if (evt.currentTarget.value.length === 6) {
      evt.currentTarget.value = evt.currentTarget.value + ')';
    } else if (lastLength === 8 && evt.currentTarget.value.length === 7) {
      evt.currentTarget.value = evt.currentTarget.value.slice(0, -1);
    }

    if (!template.test(evt.currentTarget.value)) {
      evt.currentTarget.setCustomValidity('Пример: +7(9xx)xxxxxxx');
    } else {
      evt.currentTarget.setCustomValidity('');
    }
    lastLength = evt.currentTarget.value.length;
  }

  function onNameChange(evt) {
    var regexp = /[а-яА-я]/;
    evt.currentTarget.addEventListener('keypress', function (e) {
      if (!regexp.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  function onResize() {
    if (document.documentElement.clientWidth < MEDIUM_WIDTH) {
      detailsNav.removeAttribute('open');
      detailsContact.addEventListener('click', onDetailsClick);
      detailsNav.addEventListener('click', onDetailsClick);
    } else {
      detailsNav.setAttribute('open', 'open');
      detailsContact.removeAttribute('click', onDetailsClick);
      detailsNav.removeAttribute('click', onDetailsClick);
    }
  }

  function onDetailsClick(evt) {
    evt.preventDefault();
    if (document.documentElement.clientWidth >= MEDIUM_WIDTH) {
      return false;
    }
    var details = [detailsNav, detailsContact];
    var idSibling = Number(evt.currentTarget.dataset.id === '0' ? '1' : '0');
    if (evt.currentTarget.hasAttribute('open')) {
      evt.currentTarget.removeAttribute('open');
      details[idSibling].setAttribute('open', 'open');
    } else {
      evt.currentTarget.setAttribute('open', 'open');
      details[idSibling].removeAttribute('open');
    }
    return true;
  }

  setStorage(questionsName, questionsTel, questionsMessage);
  openModalBtn.addEventListener('click', onOpenModal);
  modalForm.addEventListener('submit', onFormSubmit);
  questionsForm.addEventListener('submit', onFormSubmit);
  questionsTel.addEventListener('input', onTelChange);
  questionsTel.addEventListener('focus', onTelChange);
  questionsName.addEventListener('input', onNameChange);
  window.addEventListener('resize', onResize);
  detailsContact.addEventListener('click', onDetailsClick);
  detailsNav.addEventListener('click', onDetailsClick);
})();
