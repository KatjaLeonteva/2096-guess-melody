import AbstractView from "./abstract-view";

export default class TimerView extends AbstractView {
  constructor(mistakes) {
    super();
    this.mistakes = mistakes;
  }

  get template() {
    return `
    <div class="main-mistakes">
      ${Array(this.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>`;
  }

}
