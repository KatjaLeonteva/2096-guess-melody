var gameModel = (function () {
  'use strict';

  const GAME_SETTINGS = {
    totalQuestions: 10,
    totalTime: 300000, // 5 min in ms
    fastAnswerTime: 30000, // 30 sec in ms
    maxMistakes: 2,
    losePoints: -1,
    regularPoints: 1,
    fastPoints: 2,
    wrongPoints: -2
  };

  const GameStatus = {
    TIMEUP: `timeup`,
    LOSE: `lose`,
    WIN: `win`,
    CONTINUE: `continue`
  };

  const INITIAL_STATE = Object.freeze({
    level: 0,
    timeLeft: GAME_SETTINGS.totalTime,
    mistakes: 0,
    answers: []
  });

  /**
   * Проверяет ответы пользователя
   * @param {Object} question Вопрос
   * @param {Array} answers Ответы пользователя
   * @return {Boolean} Возвращает true, если выбраны только верные ответы
   */

  const checkAnswers = (question, answers) => {
    const correctAnswers = [...Object.entries(question.answers)].reduce((arr, [answerValue, answerData]) => {
      if (answerData.correct) {
        arr.push(answerValue);
      }
      return arr;
    }, []);

    if (correctAnswers.length === answers.length) {
      return correctAnswers.every((elem) => answers.includes(elem));
    } else {
      return false;
    }
  };

  class GameModel {
    constructor(data) {
      this.data = data;
      // Чтобы включить режим отладки, нужно добавить в url параметр ?debug=true
      // Правильные ответы будут обозначены красным.
      this.debug = new URLSearchParams(location.search).get(`debug`) || false;
      this.restart();
    }

    get questions() {
      return this.data.questions;
    }

    get audiosMap() {
      return this.data.audiosMap;
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
      return this.questions[this.level];
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

      const time = GAME_SETTINGS.totalTime - this.timeLeft - this._calculateAnswersTime();
      this.state.answers.push({time, correct});
    }

    tick(interval) {
      if (this.timeLeft > 0) {
        this.state.timeLeft -= interval;
        return true;
      }
      return false;
    }

    _calculateAnswersTime() {
      return this.state.answers.reduce((sum, answer) => {
        sum += answer.time;
        return sum;
      }, 0);
    }

  }

  return GameModel;

}());

//# sourceMappingURL=game-model.js.map
