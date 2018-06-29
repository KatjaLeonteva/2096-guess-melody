import AbstractView from "./abstract-view";
import {msToMinutesAndSeconds, pluralize} from "../util";

const LoaderText = {
  PROGRESS: `Игра загружается...`,
  FAIL: `Загрузить еще раз`
};

export default class WelcomeView extends AbstractView {
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
