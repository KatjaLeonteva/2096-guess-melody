/** @module Приветствие */

import Application from "../app";
import Loader from "../loader";
import WelcomeView from "../views/welcome-view";
import {GAME_SETTINGS} from "../data/game-data";

export default class WelcomeScreen {
  constructor() {
    this.loadQuestions = () => {
      Loader.loadData()
      .then((data) => {
        if (data) {
          this.data = data;
          this.screen.onLoadSuccess();
        } else {
          this.screen.onLoadFail();
        }
      });
    };

    this.screen = new WelcomeView(GAME_SETTINGS, this.loadQuestions);

    this.bind();
    this.init();
  }

  get element() {
    return this.screen.element;
  }

  init() {
    this.loadQuestions();
  }

  bind() {
    this.screen.onPlayButtonClick = () => Application.showGame(this.data);
  }

}
