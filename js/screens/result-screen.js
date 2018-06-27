import Application from '../app';
import ResultView from "../views/result-view";
import ReplayView from "../views/replay-view";
import getResult from "../game/get-result";
import getComparison from "../game/get-comparison";
import Loader from "../loader";
import calculatePoints from "../game/calculate-points";
import {GameStatus} from "../data/game-data";

export default class ResultScreen {
  constructor(model) {
    this.model = model;
    this.points = calculatePoints(this.model.state, this.model.status);
    this.screen = new ResultView(getResult(this.model.state, this.model.status, this.points));
    this.replay = new ReplayView((this.model.status === GameStatus.WIN ? `Сыграть` : `Попробовать`) + ` ещё раз`);

    // Если выигрыш, сохраняем результат и загружаем статистику
    // и показываем сравнение с другими игроками
    if (this.model.status === GameStatus.WIN) {
      Loader.saveData({date: Date.now(), points: this.points})
        .then(Loader.loadStatistics)
        .then((data) => {
          if (data) {
            this.stats = data;
            this.screen.onStatsLoad(getComparison(this.points, this.stats));
          }
        });
    }

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
