import {GAME_SETTINGS} from "../data/game-data";
import changeScreen from "../game/change-screen";

import Application from "../app";
import LogoView from "../views/logo-view";
import TimerView from "../views/timer-view";
import MistakesView from "../views/mistakes-view";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import ConfirmView from "../views/confirm-view";

const questionScreenMap = {
  guessArtist: ArtistView,
  chooseGenre: GenreView
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.screen = new questionScreenMap[this.model.currentQuestion.type](this.model.currentQuestion);
    this.logo = new LogoView();
    this.timer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
    this.mistakes = new MistakesView(this.model.mistakes);

    this.render();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  render() {
    const wrapper = this.element.querySelector(`.main-wrap`);
    this.screen.element.insertBefore(this.logo.element, wrapper);
    this.screen.element.insertBefore(this.timer.element, wrapper);
    this.screen.element.insertBefore(this.mistakes.element, wrapper);
  }

  bind() {
    this.logo.onLogoClick = () => this.confirmRestart();

    this.screen.onPauseTrack = (player) => this.pauseTrack(player);
    this.screen.onPlayTrack = (player, otherPlayers) => this.playTrack(player, otherPlayers);

    this.screen.onAnswerSend = (userAnswers) => {
      // TODO Считать время ответа
      this.model.saveAnswer(10000, userAnswers);

      if (this.model.status === `continue`) {
        this.model.levelUp();
        changeScreen(new GameScreen(this.model).element);
      } else {
        Application.showResult(this.model.state, this.model.status);
      }
    };
  }

  confirmRestart() {
    const modal = new ConfirmView(`Вы уверены что хотите начать игру заново?`);
    modal.onConfirm = () => Application.showWelcome();
    modal.onCancel = () => this.screen.element.removeChild(modal.element);

    // TODO Добавить остановку таймера и музыки
    this.screen.element.appendChild(modal.element);
  }

  pauseTrack(player) {
    player.querySelector(`audio`).pause();
    player.querySelector(`.player-control`).classList.replace(`player-control--pause`, `player-control--play`);
  }

  playTrack(player, otherPlayers) {
    otherPlayers.forEach((plr) => this.pauseTrack(plr));
    player.querySelector(`audio`).play();
    player.querySelector(`.player-control`).classList.replace(`player-control--play`, `player-control--pause`);
  }

}
