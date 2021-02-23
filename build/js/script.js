`use strict`;
(function () {
  const body = document.querySelector(`body`);
  const modalTemplate = document.querySelector(`#modal`).content.querySelector(`.modal`);
  const newModal = modalTemplate.cloneNode(true);
  const openModalBtn = body.querySelector(`.header__link-modal`);
  const modalForm = newModal.querySelector(`.modal__form`);
  const questionsForm = document.querySelector(`.question__form `);
  const questionsTel = questionsForm.querySelector(`#tel`);
  const questionsName = questionsForm.querySelector(`#name`);
  const questionsMessage = questionsForm.querySelector(`#text`);

  let isStorageSupport = true;
  let storageSupportName;
  let storageSupportTel;
  let storageSupportMessage;

  try {
    storageSupportName = localStorage.getItem(`name`);
    storageSupportTel = localStorage.getItem(`tel`);
    storageSupportMessage = localStorage.getItem(`message`);
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
    evt.preventDefault();
    if (evt.key !== `Escape` && !evt.target.classList.contains(`modal__close`) && !evt.target.classList.contains(`modal`)) {
      return;
    }
    body.classList.remove(`overflow`);
    newModal.remove();
    document.removeEventListener(`keydown`, onCloseModal);
  }

  function onOpenModal(evt) {
    evt.preventDefault();
    body.insertAdjacentElement(`afterbegin`, newModal);
    body.classList.add(`overflow`);
    newModal.querySelector(`.modal__close`).addEventListener(`click`, onCloseModal);
    document.addEventListener(`keydown`, onCloseModal);
    newModal.addEventListener(`click`, onCloseModal);
    const name = newModal.querySelector(`#name-m`);
    const tel = newModal.querySelector(`#tel-m`);
    const message = newModal.querySelector(`#text-m`);
    name.focus();
    tel.addEventListener(`focus`, onTelChange)
    tel.addEventListener(`input`, onTelChange);
    setStorage(name, tel, message);
  }


  function onFormSubmit(evt) {
    evt.preventDefault();
    if (!this.querySelector(`input[name="agree"]`).checked) {
      return;
    }
    if (isStorageSupport) {
      localStorage.setItem(`name`, this.querySelector(`input[name="name"]`).value);
      localStorage.setItem(`tel`, this.querySelector(`input[name="tel"]`).value);
      localStorage.setItem(`message`, this.querySelector(`textarea[name="text"]`).value);
    }
    this.submit();
    if (newModal) {
      newModal.remove();
    }
  }


  function onTelChange() {
    const template = /^\+7\([0-9]{3}\)[0-9]{7}/;
    this.addEventListener(`keypress`, e => {
      if (!/\d/.test(e.key))
        e.preventDefault();
    });
    if (this.value.length === 0) {
      this.value = `+7(`
    } else if (this.value.length === 6) {
      this.value = `${this.value})`;
    }
    if (!template.test(this.value)) {
      this.setCustomValidity(`Пример: +7(9xx)xxxxxxx`);
    } else {
      this.setCustomValidity(``);
    }
  }

  setStorage(questionsName, questionsTel, questionsMessage);
  openModalBtn.addEventListener(`click`, onOpenModal);
  modalForm.addEventListener(`submit`, onFormSubmit);
  questionsForm.addEventListener(`submit`, onFormSubmit)
  questionsTel.addEventListener(`input`, onTelChange);
  questionsTel.addEventListener(`focus`, onTelChange);
})();
