(function (chai) {
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

  const calculatePoints = (gameState, gameOutput) => {
    if (gameOutput === GameStatus.TIMEUP || gameOutput === GameStatus.LOSE) {
      return GAME_SETTINGS.losePoints;
    }

    return gameState.answers.reduce((points, answer) => {
      if (answer.correct) {
        points += (answer.time < GAME_SETTINGS.fastAnswerTime) ? GAME_SETTINGS.fastPoints : GAME_SETTINGS.regularPoints;
      } else {
        points += GAME_SETTINGS.wrongPoints;
      }
      return points;
    }, 0);
  };

  describe(`Check points calculator`, () => {
    it(`should return -1 if answered less than 10 answers`, () => {
      chai.assert.equal(calculatePoints({answers: [
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000}
      ], mistakes: 0}, GameStatus.TIMEUP), -1);
    });

    it(`should return -1 if used all attempts`, () => {
      chai.assert.equal(calculatePoints({answers: [
        {correct: true, time: 60000},
        {correct: false, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: false, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: false, time: 60000},
        {correct: true, time: 60000}
      ], mistakes: 3}, GameStatus.LOSE), -1);
      chai.assert.equal(calculatePoints({answers: [
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: true, time: 10000},
        {correct: false, time: 10000},
        {correct: false, time: 10000},
        {correct: false, time: 10000}
      ], mistakes: 3}, GameStatus.LOSE), -1);
    });

    it(`should return 10 if all answers are correct and slow`, () => {
      chai.assert.equal(calculatePoints({answers: [
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000},
        {correct: true, time: 60000}
      ], mistakes: 0}, GameStatus.WIN), 10);
    });

    it(`should return 20 if all answers are correct and fast`, () => {
      chai.assert.equal(calculatePoints({answers: [
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000},
        {correct: true, time: 20000}
      ], mistakes: 0}, GameStatus.WIN), 20);
    });

    it(`should return between 0 and 20`, () => {
      chai.assert.match(calculatePoints({answers: [
        {correct: true, time: 10000},
        {correct: false, time: 20000},
        {correct: true, time: 30000},
        {correct: false, time: 40000},
        {correct: true, time: 50000},
        {correct: true, time: 10000},
        {correct: true, time: 20000},
        {correct: true, time: 30000},
        {correct: true, time: 40000},
        {correct: true, time: 50000}
      ], mistakes: 2}, GameStatus.WIN), /^([0-1]?[0-9]|20)$/);
    });
  });

}(chai));

//# sourceMappingURL=calculate-points.test.js.map
