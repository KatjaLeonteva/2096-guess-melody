import {GAME_SETTINGS, GameStatus, INITIAL_STATE} from "./game-data";
import checkAnswers from "../game/check-answers";

class GameModel {
  constructor(data) {
    this.data = data;
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
    return this.data[this.level];
  }

  get status() {
    if (this.state.timeLeft === 0) {
      return GameStatus.TIMEUP;
    }

    if (this.state.mistakes > GAME_SETTINGS.maxMistakes) {
      return GameStatus.LOSE;
    }

    if (this.state.answers.length === GAME_SETTINGS.totalQuestions) {
      return GameStatus.WIN;
    }

    return GameStatus.CONTINUE;
  }

  restart() {
    this.state = Object.assign({}, INITIAL_STATE);
    this.state.answers = []; // Удаляем ответы, оставшиеся с предыдущей игры
  }

  levelUp() {
    this.state.level++;
  }

  saveAnswer(answer) {
    const correct = checkAnswers(this.currentQuestion, answer);

    if (!correct) {
      this.state.mistakes++;
    }

    const time = GAME_SETTINGS.totalTime - this.timeLeft - this.calculateAnswersTime();
    this.state.answers.push({time, correct});
  }

  tick(interval) {
    if (this.timeLeft > 0) {
      this.state.timeLeft -= interval;
      return true;
    }
    return false;
  }

  calculateAnswersTime() {
    return this.state.answers.reduce((sum, answer) => {
      sum += answer.time;
      return sum;
    }, 0);
  }

}

export default GameModel;
