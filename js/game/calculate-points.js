var calculatePoints = (function () {
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

  return calculatePoints;

}());

//# sourceMappingURL=calculate-points.js.map
