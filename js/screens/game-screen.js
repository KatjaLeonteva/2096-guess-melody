import {GAME_SETTINGS, GameStatus} from "../data/game-data";
import changeScreen from "../game/change-screen";
import {TimeInMs} from "../util";

import Application from "../app";
import LogoView from "../views/logo-view";
import TimerView from "../views/timer-view";
import MistakesView from "../views/mistakes-view";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import ConfirmView from "../views/confirm-view";

const GameView = {
  guessArtist: ArtistView,
  chooseGenre: GenreView
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.screen = new GameView[this.model.currentQuestion.type](this.model);
    this.logo = new LogoView();
    this.timer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
    this.mistakes = new MistakesView(this.model.mistakes);
    this.modal = new ConfirmView(`Вы уверены что хотите начать игру заново?`);

    this._interval = null;

    this.bind();
    this.init();
    this.startTimer();
  }

  get element() {
    return this.screen.element;
  }

  init() {
    const wrapper = this.element.querySelector(`.main-wrap`);
    this.screen.element.insertBefore(this.logo.element, wrapper);
    this.screen.element.insertBefore(this.timer.element, wrapper);
    this.screen.element.insertBefore(this.mistakes.element, wrapper);
  }

  bind() {
    this.logo.onLogoClick = () => this.confirmRestart();

    this.screen.onAnswerSend = (userAnswers) => {
      this.stopTimer();
      this.screen.stopAllTracks(); // Баг в Safari: песни продолжают проигрываться при переходе на новый экран
      this.model.saveAnswer(userAnswers);

      if (this.model.status === GameStatus.CONTINUE) {
        this.model.levelUp();
        changeScreen(new GameScreen(this.model).element);
      } else {
        Application.showResult(this.model);
      }
    };

    this.modal.onConfirm = () => Application.showWelcome();
    this.modal.onCancel = () => {
      this.startTimer();
      this.screen.element.removeChild(this.modal.element);
    };
  }

  stopTimer() {
    clearInterval(this._interval);
  }

  startTimer() {
    this._interval = setInterval(() => {
      const tick = this.model.tick(TimeInMs.ONE_SECOND);
      if (tick) {
        this.updateTimer();
      } else {
        this.stopTimer();
        Application.showResult(this.model);
      }
    }, TimeInMs.ONE_SECOND);
  }

  updateTimer() {
    const newTimer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
    this.screen.element.replaceChild(newTimer.element, this.timer.element);
    this.timer = newTimer;
  }

  confirmRestart() {
    this.stopTimer();
    this.screen.pauseAllTracks();
    this.screen.element.appendChild(this.modal.element);
  }

}
