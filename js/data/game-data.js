var gameData = (function (exports) {
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

  exports.GAME_SETTINGS = GAME_SETTINGS;
  exports.GameStatus = GameStatus;
  exports.INITIAL_STATE = INITIAL_STATE;

  return exports;

}({}));

//# sourceMappingURL=game-data.js.map
