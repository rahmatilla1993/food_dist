import { getResources } from "../services/service";

function cards() {
  function renderCard({ img, altimg, title, descr, price } = {}, selector) {
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

  getResources("http://localhost:3000/menu").then((data) => {
    data.forEach((data) => {
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

export default cards;
