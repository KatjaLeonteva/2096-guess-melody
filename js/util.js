const app = document.querySelector(`div.app`);

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
 * @param {Node} screen Экран, который нужно отобразить.
 */
export const changeScreen = (screen) => {
  const currentScreen = app.querySelector(`section.main`);
  app.replaceChild(screen, currentScreen);
};
