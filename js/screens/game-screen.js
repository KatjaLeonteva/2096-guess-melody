import {GAME_SETTINGS, GameStatus} from "../data/game-data";
import changeScreen from "../game/change-screen";

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

const ONE_SECOND = 1000;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.screen = new GameView[this.model.currentQuestion.type](this.model.currentQuestion);
    this.logo = new LogoView();
    this.timer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
    this.mistakes = new MistakesView(this.model.mistakes);
    this.modal = new ConfirmView(`Вы уверены что хотите начать игру заново?`);

    this._interval = null;

    this.render();
    this.bind();
    this.startTimer();
  }

  get element() {
    return this.screen.element;
  }

  render() {
    const wrapper = this.element.querySelector(`.main-wrap`);
    this.screen.element.insertBefore(this.logo.element, wrapper);
    this.screen.element.insertBefore(this.timer.element, wrapper);
    this.screen.element.insertBefore(this.mistakes.element, wrapper);

    // Для тестирования (выводит ответы с указанием true / false):
    // Object.entries(this.model.currentQuestion.answers).map((el) => console.log(el[1]));
    // console.log(`---`);
  }

  bind() {
    this.logo.onLogoClick = () => this.confirmRestart();

    this.screen.onPauseTrack = (player) => this.pauseTrack(player);
    this.screen.onPlayTrack = (player, otherPlayers) => this.playTrack(player, otherPlayers);

    this.screen.onAnswerSend = (userAnswers) => {
      this.stopTracks();
      this.stopTimer();
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
      const tick = this.model.tick(ONE_SECOND);
      if (tick) {
        this.updateTimer();
      } else {
        this.stopTimer();
        Application.showResult(this.model);
      }
    }, ONE_SECOND);
  }

  updateTimer() {
    const newTimer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
    this.screen.element.replaceChild(newTimer.element, this.timer.element);
    this.timer = newTimer;
  }

  pauseTracks(players) {
    players.forEach((player) => this.pauseTrack(player));
  }

  pauseTrack(player) {
    player.querySelector(`audio`).pause();
    player.querySelector(`.player-control`).classList.replace(`player-control--pause`, `player-control--play`);
  }

  playTrack(player, otherPlayers) {
    this.pauseTracks(otherPlayers);
    player.querySelector(`audio`).play();
    player.querySelector(`.player-control`).classList.replace(`player-control--play`, `player-control--pause`);
  }

  stopTracks() {
    const players = Array.from(this.screen.element.querySelectorAll(`.player`));
    players.forEach((player) => {
      const audio = player.querySelector(`audio`);
      audio.pause();
      audio.currentTime = 0;
    });
  }

  confirmRestart() {
    this.stopTimer();
    this.pauseTracks(Array.from(this.screen.element.querySelectorAll(`.player`)));
    this.screen.element.appendChild(this.modal.element);
  }

}
