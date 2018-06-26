/** @module Приветствие */

import Application from "../app";
import Loader from "../loader";
import WelcomeView from "../views/welcome-view";
import {GAME_SETTINGS} from "../data/game-data";

export default class WelcomeScreen {
  constructor() {
    this.screen = new WelcomeView(GAME_SETTINGS);
    this.bind();

    Loader.loadData()
      .then((data) => {
        if (data) {
          this.data = data;
          this.screen.onDataLoad();
        }
      });
  }

  get element() {
    return this.screen.element;
  }

  bind() {
    this.screen.onPlayButtonClick = () => Application.showGame(this.data);
  }

}
