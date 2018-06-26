import changeScreen from "../game/change-screen";
import {GAME_SETTINGS} from "../data/game-data";
import gameScreen from "../screens/game-screen";

const INITIAL_STATE = Object.freeze({
  level: 0,
  timeLeft: GAME_SETTINGS.totalTime,
  mistakes: 0,
  answers: []
});

const startGame = () => {
  let gameState = Object.assign({}, INITIAL_STATE);
  gameState.answers = [];
  changeScreen(gameScreen(gameState));
};

export default startGame;
