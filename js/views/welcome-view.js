import AbstractView from "./abstract-view";
import {msToMinutesAndSeconds, pluralize} from "../util";

export default class WelcomeView extends AbstractView {
  constructor(settings) {
    super();
    this.settings = settings;
  }

  get template() {
    const totalTimeMin = msToMinutesAndSeconds(this.settings.totalTime).minutes;
    const maxMistakes = this.settings.maxMistakes;

    return `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play" style="display: none">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;${totalTimeMin} ${pluralize(totalTimeMin, `minutes`)} ответить на все вопросы.<br>
        Ошибиться можно ${maxMistakes} ${pluralize(maxMistakes, `attempts`)}.<br>
        Удачи!
      </p>
    </section>`;
  }

  onPlayButtonClick() {}

  onDataLoad() {
    this.element.querySelector(`.main-play`).style.display = `block`;
  }

  bind() {
    const playButton = this.element.querySelector(`.main-play`);
    playButton.addEventListener(`click`, () => this.onPlayButtonClick());
  }
}
