/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  // Calc
  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  function setDefaultValues() {
    if (localStorage.getItem("sex")) {
      sex = localStorage.getItem("sex");
    } else {
      sex = "female";
      localStorage.setItem("sex", sex);
    }

    if (localStorage.getItem("ratio")) {
      ratio = localStorage.getItem("ratio");
    } else {
      ratio = 1.375;
      localStorage.setItem("ratio", ratio);
    }
  }

  setDefaultValues();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);

      if (element.getAttribute("id") === localStorage.getItem("sex")) {
        element.classList.add(activeClass);
      } else if (element.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        element.classList.add(activeClass);
      }
    });
  }

  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
  initLocalSettings("#gender div", "calculating__choose-item_active");

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener("click", e => {
        if (element.getAttribute("data-ratio")) {
          // ratio = +element.getAttribute("data-ratio");
          localStorage.setItem("ratio", +element.getAttribute("data-ratio"));
          ratio = localStorage.getItem("ratio");
        } else {
          localStorage.setItem("sex", element.getAttribute("id")); // sex = element.getAttribute("id");

          sex = localStorage.getItem("sex");
        }

        elements.forEach(element => {
          element.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
  getStaticInformation("#gender div", "calculating__choose-item_active");

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;

        case "weight":
          weight = +input.value;
          break;

        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");


function cards() {
  function renderCard() {
    let {
      img,
      altimg,
      title,
      descr,
      price
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let selector = arguments.length > 1 ? arguments[1] : undefined;
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu__item");
    menuItem.innerHTML = `
          <img src="${img}" alt="${altimg}" />
          <h3 class="menu__item-subtitle">${title}"</h3>
          <div class="menu__item-descr">
            ${descr}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
          </div>
        `;
    document.querySelector(selector).append(menuItem);
  }

  const container = document.querySelector(".menu .container");
  (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu").then(data => {
    data.forEach(data => {
      renderCard(data, ".menu .container");
    });
  });

  function clearContainer(container) {
    let child = container.lastElementChild;

    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
  }

  clearContainer(container);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");



function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);
  const messages = {
    loading: "img/form/spinner.svg",
    success: "Rahmat, Siz bilan aloqaga chiqamiz...",
    failure: "Qandaydir xatolik"
  };

  function sendData(form) {
    form.addEventListener("submit", e => {
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
      (0,_services_service__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", JSON.stringify(obj)).then(data => {
        console.log(data);
        showThanksModal(messages.success);
      }).catch(() => {
        showThanksModal(messages.failure);
      }).finally(() => {
        form.reset();
        statusMessage.remove();
      });
    });
  }

  forms.forEach(form => {
    sendData(form);
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
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
  modalTrigger.forEach(item => {
    item.addEventListener("click", () => showModal(modalSelector, modalTimerId));
  });
  window.addEventListener("scroll", showModalByScroll);
  document.addEventListener("keydown", e => {
    if (e.code === "Escape") {
      closeModal(modalSelector);
    }
  });
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.hasAttribute("data-close")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Sliders
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        currVal = document.querySelector(currentCounter),
        totalVal = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1,
      offset = 0;
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = "relative";
  const indicators = document.createElement("ol"),
        dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  if (slides.length < 10) {
    totalVal.textContent = `0${slides.length}`;
    currVal.textContent = `0${slideIndex}`;
  } else {
    totalVal.textContent = slides.length;
    currVal.textContent = slideIndex;
  }

  function setCurrentValue() {
    if (slides.length < 10) {
      currVal.textContent = `0${slideIndex}`;
    } else {
      currVal.textContent = slideIndex;
    }
  }

  function getDigitByString(str) {
    return str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset === +getDigitByString(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +getDigitByString(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCurrentValue();
    dots.forEach(dot => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });
  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = +getDigitByString(width) * (slides.length - 1);
    } else {
      offset -= +getDigitByString(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setCurrentValue();
    dots.forEach(dot => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  });
  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +getDigitByString(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      setCurrentValue();
      dots.forEach(dot => {
        dot.style.opacity = ".5";
      });
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabcontainer = document.querySelector(tabsParentSelector);
  const tabs = document.querySelectorAll(tabsContentSelector);
  const tab_items = document.querySelectorAll(tabsSelector); // Tab

  tabcontainer.addEventListener("click", onClickHandler);

  function onClickHandler(_ref) {
    let {
      target
    } = _ref;

    if (target.classList.contains(tabsSelector.slice(1))) {
      tab_items.forEach((item, index) => {
        if (item === target) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  }

  function hideTabContent() {
    tab_items.forEach(tab_item => {
      if (tab_item.classList.contains(activeClass)) {
        tab_item.classList.remove(activeClass);
      }
    });
    tabs.forEach(tab => {
      tab.classList.add("hide");
      tab.classList.remove("show");
    });
  }

  function showTabContent() {
    let ind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabs[ind].classList.add("show");
    tabs[ind].classList.remove("hide");
    tab_items[ind].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  //Set Clock
  function getRemainingTime(endtime) {
    const time = Date.parse(endtime) - Date.now(),
          days = Math.floor(time / (1000 * 60 * 60 * 24)),
          hours = Math.floor(time / (1000 * 60 * 60) % 24),
          minutes = Math.floor(time / (1000 * 60) % 60),
          seconds = Math.floor(time / 1000 % 60);
    return {
      total: time,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) return `0${num}`;
    return num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          day = timer.querySelector("#days"),
          hour = timer.querySelector("#hours"),
          minute = timer.querySelector("#minutes"),
          second = timer.querySelector("#seconds"),
          timerInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const {
        total,
        days,
        hours,
        minutes,
        seconds
      } = getRemainingTime(endtime);

      if (total <= 0) {
        clearInterval(timerInterval);
      }

      day.textContent = getZero(days);
      hour.textContent = getZero(hours);
      minute.textContent = getZero(minutes);
      second.textContent = getZero(seconds);
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json"
    }
  });
  return await res.json();
};

const getResources = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)(".modal", modalTimerId);
  }, 3000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    prevArrow: ".offer__slider-prev",
    nextArrow: ".offer__slider-next",
    currentCounter: "#current",
    totalCounter: "#total",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    slide: ".offer__slide"
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2022-08-05");
}); // Class example with card
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map