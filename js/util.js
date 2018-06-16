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

/**
 * Переводит миллисекунды в минуты и секунды
 * @param {number} ms Миллисекунды.
 * @return {object} Время в минутах и секундах
 */
export const msToMinutesAndSeconds = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return {minutes, seconds};
};

