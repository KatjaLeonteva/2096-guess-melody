import AbstractView from "./abstract-view";

export default class ResultView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
  }

  get template() {
    return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
    <h2 class="title">${this.result.title}</h2>
    <div class="main-stat">${this.result.description}</div>
    <span class="main-comparison">${this.result.comparison}</span> <!-- TODO Как показывать только для win? -->
  </section>`;
  }

  bind() {
    //
  }
}
