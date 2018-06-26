import Application from '../app';
import ResultView from "../views/result-view";
import ReplayView from "../views/replay-view";
import getResult from "../game/get-result";

export default class ResultScreen {
  constructor(model) {
    this.model = model;
    this.screen = new ResultView(getResult(this.model.state, this.model.status), this.model.status);
    this.replay = new ReplayView((this.model.status === `win` ? `Сыграть` : `Попробовать`) + ` ещё раз`);

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
    this.replay.onReplayButtonClick = () => Application.showGame(this.model.data);
  }

}
