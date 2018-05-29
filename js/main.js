'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

const app = document.querySelector(`div.app`);
const mainElement = app.querySelector(`section.main`);
const templateElement = document.querySelector(`template`);

// Массив DOM-элементов всех возможных экранов приложения
const screens = Array.from(templateElement.content.querySelectorAll(`section.main`));

// Функция добавления слайда
const renderSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

// Функция выбора следующего и предыдущего слайда,
// проверяет границы и циклически переключает экраны
let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  renderSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

// Показываем первый экран
select(0);


