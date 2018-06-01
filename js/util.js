const app = document.querySelector(`div.app`);
const mainElement = app.querySelector(`section.main`);

/**
 * Создает DOM-элемент по шаблону.
 * @param {string} markup Разметка элемента.
 * @return {Node} Новый элемент.
 */
export const render = (markup) => {
  const template = document.createElement(`template`);
  template.innerHTML = markup.trim();
  return template.content.firstChild;
};

/**
 * Переключает текущий экран.
 * @param {Node} element Элемент, который нужно отобразить.
 */
export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
