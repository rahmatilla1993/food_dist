function showModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove("show");
  modal.classList.add("hide");
  document.body.style.overflow = "auto";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((item) => {
    item.addEventListener("click", () =>
      showModal(modalSelector, modalTimerId)
    );
  });

  window.addEventListener("scroll", showModalByScroll);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal(modalSelector);
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.hasAttribute("data-close")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
}

export default modal;
export { showModal, closeModal };
