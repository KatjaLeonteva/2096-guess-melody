const app = document.querySelector(`div.app`);
const mainElement = app.querySelector(`section.main`);

// Создание элемента из шаблона
export const render = (markup) => {
  const template = document.createElement(`template`);
  template.innerHTML = markup.trim();
  return template.content.firstChild;
};

// Переключение текущего экрана
export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
