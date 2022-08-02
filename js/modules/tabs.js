function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabcontainer = document.querySelector(tabsParentSelector);
  const tabs = document.querySelectorAll(tabsContentSelector);
  const tab_items = document.querySelectorAll(tabsSelector);

  // Tab
  tabcontainer.addEventListener("click", onClickHandler);

  function onClickHandler({ target }) {
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
    tab_items.forEach((tab_item) => {
      if (tab_item.classList.contains(activeClass)) {
        tab_item.classList.remove(activeClass);
      }
    });
    tabs.forEach((tab) => {
      tab.classList.add("hide");
      tab.classList.remove("show");
    });
  }

  function showTabContent(ind = 0) {
    tabs[ind].classList.add("show");
    tabs[ind].classList.remove("hide");
    tab_items[ind].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
}

export default tabs;
