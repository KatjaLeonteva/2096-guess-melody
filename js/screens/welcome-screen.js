/** @module Приветствие */

import WelcomeView from "../views/welcome-view";
import {GAME_SETTINGS} from "../data/game-data";
import startGame from "../game/start-game";

const welcomeScreen = () => {
  const screen = new WelcomeView(GAME_SETTINGS);
  screen.onPlayButtonClick = () => startGame();

  return screen.element;
};

export default welcomeScreen;
