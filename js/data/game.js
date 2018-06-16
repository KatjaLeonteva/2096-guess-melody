import {changeScreen} from "../util";
import gameScreen from "../game/game-screen";

export const GAME_SETTINGS = {
  totalQuestions: 10,
  totalTime: 300000, // 5 min in ms
  fastAnswerTime: 30000, // 30 sec in ms
  maxMistakes: 3,
  losePoints: -1,
  regularPoints: 1,
  fastPoints: 2,
  wrongPoints: -2
};

export const INITIAL_STATE = Object.freeze({
  level: 0,
  timeLeft: GAME_SETTINGS.totalTime,
  mistakes: 0,
  answers: []
});

export const startGame = () => {
  let gameState = Object.assign({}, INITIAL_STATE);
  gameState.answers = [];
  changeScreen(gameScreen(gameState));
};
