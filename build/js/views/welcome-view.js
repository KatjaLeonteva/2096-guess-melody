var welcomeView = (function () {
  'use strict';

  /**
   * Создает DOM-элемент по шаблону.
   * @param {string} markup Разметка элемента.
   * @return {Node} Новый элемент.
   */
  const render = (markup = ``) => {
    const template = document.createElement(`template`);
    template.innerHTML = markup.trim();
    return template.content.firstChild;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render(this.template);
    }

    bind() {
      // bind handlers if required
    }

  }

  // Варианты склонения для 1 шт, 2-4 шт, 0 и 5-20 шт
  const cases = {
    minutes: [`минуту`, `минуты`, `минут`],
    seconds: [`секунду`, `секунды`, `секунд`],
    points: [`балл`, `балла`, `баллов`],
    mistakes: [`ошибку`, `ошибки`, `ошибок`],
    attempts: [`раз`, `раза`, `раз`],
    fast: [`быстрый`, `быстрых`, `быстрых`]
  };

  const TimeInMs = {
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
  };

  /**
   * Переводит миллисекунды в минуты и секунды
   * @param {number} ms Миллисекунды.
   * @return {object} Время в минутах и секундах
   */
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / TimeInMs.ONE_MINUTE);
    const seconds = ((ms % TimeInMs.ONE_MINUTE) / TimeInMs.ONE_SECOND).toFixed(0);
    return {minutes, seconds};
  };

  /**
   * Возвращает существительное в правильном склонении
   * в зависимости от стоящего перед ним числа
   * @param {number} number Число
   * @param {string} noun Существительное
   * @return {string} Существительное в правильном склонении
   */
  const pluralize = (number, noun) => {
    const nouns = cases[noun];

    let n = Math.abs(number);

    // Ends in 1, excluding 11
    if (n % 10 === 1 && n % 100 !== 11) {
      return nouns[0];
    }
    // Ends in 2-4, excluding 12-14
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return nouns[1];
    }

    // Everything else
    return nouns[2];
  };

  const LoaderText = {
    PROGRESS: `Игра загружается...`,
    FAIL: `Загрузить еще раз`
  };

  class WelcomeView extends AbstractView {
    constructor(settings, callback) {
      super();
      this.settings = settings;
      this.callback = callback;
    }

    get template() {
      const totalTimeMin = msToMinutesAndSeconds(this.settings.totalTime).minutes;
      const maxMistakes = this.settings.maxMistakes;

      return `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <p class="text loader">${LoaderText.PROGRESS}</p>
      <button class="main-play main-play--hidden">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;${totalTimeMin} ${pluralize(totalTimeMin, `minutes`)} ответить на все вопросы.<br>
        Ошибиться можно ${maxMistakes} ${pluralize(maxMistakes, `attempts`)}.<br>
        Удачи!
      </p>
    </section>`;
    }

    onPlayButtonClick() {}

    onLoadSuccess() {
      this.element.querySelector(`.main-play`).classList.remove(`main-play--hidden`);
      this.element.querySelector(`.loader`).remove();
    }

    onLoadFail() {
      const loader = this.element.querySelector(`.loader`);

      const onLoaderClick = () => {
        loader.textContent = LoaderText.PROGRESS;
        loader.classList.remove(`loader--failed`);
        this.callback();
        loader.removeEventListener(`click`, onLoaderClick);
      };

      // Если данные не загрузились, попробовать еще раз
      loader.textContent = LoaderText.FAIL;
      loader.classList.add(`loader--failed`);
      loader.addEventListener(`click`, onLoaderClick);
    }

    bind() {
      const playButton = this.element.querySelector(`.main-play`);
      playButton.addEventListener(`click`, () => this.onPlayButtonClick());
    }
  }

  return WelcomeView;

}());

//# sourceMappingURL=welcome-view.js.map
