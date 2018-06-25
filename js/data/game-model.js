import {GAME_SETTINGS, INITIAL_STATE, gameQuestions} from "./game-data";
import checkAnswers from "../game/check-answers";

class GameModel {
  constructor() {
    this._questions = gameQuestions;
    this.restart();
  }

  get level() {
    return this.state.level;
  }

  get timeLeft() {
    return this.state.timeLeft;
  }

  get mistakes() {
    return this.state.mistakes;
  }

  get currentQuestion() {
    return this._questions[this.level];
  }

  get status() {
    if (this.state.timeLeft === 0) {
      return `timeup`;
    }

    if (this.state.mistakes > GAME_SETTINGS.maxMistakes) {
      return `lose`;
    }

    if (this.state.answers.length === GAME_SETTINGS.totalQuestions) {
      return `win`;
    }

    return `continue`;
  }

  restart() {
    this.state = Object.assign({}, INITIAL_STATE);
    this.state.answers = []; // Удаляем ответы, оставшиеся с предыдущей игры
  }

  levelUp() {
    this.state.level++;
  }

  saveAnswer(time, answer) {
    const correct = checkAnswers(this.currentQuestion, answer);

    if (!correct) {
      this.state.mistakes++;
    }

    this.state.timeLeft = Math.max((this.state.timeLeft - time), 0);

    this.state.answers.push({time, correct});
  }

}

export default GameModel;
