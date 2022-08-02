import { showModal, closeModal } from "./modal";
import { postData } from "../services/service";

function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);

  const messages = {
    loading: "img/form/spinner.svg",
    success: "Rahmat, Siz bilan aloqaga chiqamiz...",
    failure: "Qandaydir xatolik",
  };

  function sendData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      const statusMessage = document.createElement("img");
      statusMessage.setAttribute("src", messages.loading);
      statusMessage.classList.add("loading-spinner");
      form.insertAdjacentElement("afterend", statusMessage);

      postData("http://localhost:3000/requests", JSON.stringify(obj))
        .then((data) => {
          console.log(data);
          showThanksModal(messages.success);
        })
        .catch(() => {
          showThanksModal(messages.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  forms.forEach((form) => {
    sendData(form);
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    showModal(".modal", modalTimerId);
    const successModal = document.createElement("div");
    successModal.classList.add("modal__dialog");
    successModal.innerHTML = `
    <div class='modal__content'>
      <div class='modal__close' data-close>&times;</div>
      <div class='modal__title'>${message}</div>
    </div>
  `;
    document.querySelector(".modal").append(successModal);
    setTimeout(() => {
      successModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
