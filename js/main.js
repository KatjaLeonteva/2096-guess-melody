'use strict';

const KeyCodes = {
  RIGHT_ARROW: 39,
  LEFT_ARROW: 37
};

const BUTTONS_MARKUP = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>
`;

const app = document.querySelector(`div.app`);
const mainElement = app.querySelector(`section.main`);
const templateElement = document.querySelector(`template`);

// Массив DOM-элементов всех возможных экранов приложения
const screens = Array.from(templateElement.content.querySelectorAll(`section.main`));

// Функция добавления экрана
const renderScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

// Функция выбора следующего и предыдущего экрана,
// проверяет границы и циклически переключает экраны
let current = 0;

const selectScreen = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  renderScreen(screens[current]);
};

const selectPrevScreen = () => {
  selectScreen(current - 1);
};

const selectNextScreen = () => {
  selectScreen(current + 1);
};

// Переключение экранов по нажатию на стрелки на клавиатуре
document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case KeyCodes.RIGHT_ARROW:
      selectNextScreen();
      break;
    case KeyCodes.LEFT_ARROW:
      selectPrevScreen();
      break;
  }
});

// Кнопки стрелки, дублирующие поведение с клавиатуры
app.insertAdjacentHTML(`beforeEnd`, BUTTONS_MARKUP);
const buttonsContainer = app.querySelector(`.arrows__wrap`);
const buttons = buttonsContainer.querySelectorAll(`.arrows__btn`);
buttonsContainer.addEventListener(`click`, (evt) => {
  switch (evt.target) {
    case buttons[0]:
      selectPrevScreen();
      break;
    case buttons[1]:
      selectNextScreen();
      break;
  }
});

// Показываем первый экран
selectScreen(0);
