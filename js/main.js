import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { showModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => {
    showModal(".modal", modalTimerId);
  }, 3000);

  calc();
  cards();
  forms("form", modalTimerId);
  modal("[data-modal]", ".modal", modalTimerId);
  slider({
    container: ".offer__slider",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    currentCounter: "#current",
    totalCounter: "#total",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    slide: ".offer__slide",
  });
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  timer(".timer", "2022-08-05");
});

// Class example with card

// class MenuCard {
//   constructor(src, alt, title, description, price, parentSelector, ...classes) {
//     this.src = src;
//     this.alt = alt;
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.transfer = 27;
//     this.classes = classes;
//     this.parentSelector = parentSelector;
//     this.changeToCurrency();
//   }

//   changeToCurrency() {
//     this.price = this.price * this.transfer;
//   }

//   renderMenuCard() {
//     const container = document.querySelector(this.parentSelector);

//     const menuItem = document.createElement("div");
//     this.classes.forEach((className) => {
//       menuItem.classList.add(className);
//     });
//     menuItem.innerHTML = `
//       <img src="${this.src}" alt="${this.alt}" />
//       <h3 class="menu__item-subtitle">${this.title}"</h3>
//       <div class="menu__item-descr">
//         ${this.description}
//       </div>
//       <div class="menu__item-divider"></div>
//       <div class="menu__item-price">
//         <div class="menu__item-cost">Цена:</div>
//         <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//       </div>
//     `;
//     container.append(menuItem);
//   }
// }

// axios.get("http://localhost:3000/menu").then((data) => {
//   data.data.forEach((data) => {
//     renderCard(data, ".menu .container");
//   });
// });

// function postData(form) {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const statusMessage = document.createElement("img");
//     // statusMessage.src = messages.loading;
//     statusMessage.setAttribute("src", messages.loading);
//     statusMessage.classList.add("loading__spinner");
//     // statusMessage.style.cssText = `
//     //   display:block;
//     //   margin:0 auto;
//     // `;
//     // form.append(statusMessage);
//     form.insertAdjacentElement("afterend", statusMessage);

//     const xhr = new XMLHttpRequest();
//     xhr.open("post", "server/server.php");
//     xhr.setRequestHeader("Content-Type", "application/json");

//     const object = {};
//     const formData = new FormData(form);
//     formData.forEach((value, key) => {
//       object[key] = value;
//     });
//     const json = JSON.stringify(object);
//     xhr.send(json);
//     xhr.addEventListener("load", () => {
//       if (Math.floor(xhr.status / 100) === 2) {
//         showThanksModal(messages.success);
//         form.reset();
//         statusMessage.remove();
//       } else {
//         showThanksModal(messages.failure);
//       }
//     });
//   });
// }

// fetch("http://localhost:3000/menu")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// showSlides(slideIndex);

// function getZero(num) {
//   return num < 10 ? `0${num}` : num;
// }

// function showSlides(n) {
//   totalVal.textContent = getZero(slides.length);
//   if (n > slides.length) {
//     slideIndex = 1;
//   } else if (n < 1) {
//     slideIndex = slides.length;
//   }
//   currVal.textContent = getZero(slideIndex);
//   slides.forEach((slide) => {
//     slide.classList.add("hide");
//     slide.classList.remove("show");
//   });
//   slides[slideIndex - 1].classList.add("show");
//   slides[slideIndex - 1].classList.remove("hide");
// }

// prev.addEventListener("click", () => {
//   showSlides(--slideIndex);
// });

// next.addEventListener("click", () => {
//   showSlides(++slideIndex);
// });
