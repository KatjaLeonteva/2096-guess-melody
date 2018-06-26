import Application from "../app";
import ResultView from "../views/result-view";
import ReplayView from "../views/replay-view";
import getResult from "../game/get-result";
import {GameStatus} from "../data/game-data";

export default class ResultScreen {
  constructor(state, output) {
    this.state = state;
    this.output = output;
    this.screen = new ResultView(getResult(this.state, this.output), this.output);
    this.replay = new ReplayView((this.output === GameStatus.WIN ? `Сыграть` : `Попробовать`) + ` ещё раз`);

    this.render();
    this.bind();
  }

  get element() {
    return this.screen.element;
  }

  render() {
    this.screen.element.appendChild(this.replay.element);
  }

  bind() {
    this.replay.onReplayButtonClick = () => Application.showGame();
  }

}
