const app = document.querySelector(`div.app`);

// Варианты склонения для 1, 2-4, 0,5+
const cases = {
  minutes: [`минуту`, `минуты`, `минут`],
  seconds: [`секунду`, `секунды`, `секунд`],
  points: [`балл`, `балла`, `баллов`],
  mistakes: [`ошибку`, `ошибки`, `ошибок`],
  attempts: [`раз`, `раза`, `раз`]
};

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

/**
 * Возвращает существительное в правильном склонении
 * в зависимости от стоящего перед ним числа
 * @param {number} number Число
 * @param {string} noun Существительное
 * @return {string} Существительное в правильном склонении
 */
export const pluralize = (number, noun) => {
  const nouns = cases[noun];

  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return nouns[2];
  }
  n %= 10;
  if (n === 1) {
    return nouns[0];
  }
  if (n >= 2 && n <= 4) {
    return nouns[1];
  }
  return nouns[2];
};
