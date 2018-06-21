/** @module Приветствие */

import WelcomeView from "../views/welcome-view";
import startGame from "../game/start-game";

const welcomeScreen = () => {
  const screen = new WelcomeView();
  screen.onPlayButtonClick = () => {
    startGame();
  };

  return screen.element;
};

export default welcomeScreen;
