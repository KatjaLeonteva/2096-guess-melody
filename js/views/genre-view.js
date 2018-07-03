import AbstractView from "./abstract-view";
import PlayerView from "./player-view";

export default class GenreView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
    this.question = this.model.currentQuestion;
    this.players = [];

    const placeholders = this.element.querySelectorAll(`.player`);
    placeholders.forEach((placeholder, index) => {
      const player = new PlayerView(this.model.audiosMap.get(this.question.answers[placeholder.id].track.src), index === 0);
      player.onPlayClicked = () => this.pauseAllTracks();
      this.players.push(player);
      placeholder.parentElement.replaceChild(player.element, placeholder);
    });
  }

  get template() {
    return `<section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">${this.question.title}</h2>
      <form class="genre">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="genre-answer" data-correct="${answerData.correct}">
          <div class="player" id="${answerValue}"></div>
          <input type="checkbox" name="answer" value="${answerValue}" id="a-${index + 1}">
          <label class="genre-answer-check" for="a-${index + 1}"></label>
        </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;
  }

  onAnswerSend() {}

  bind() {
    // Обработчик для формы
    const genreForm = this.element.querySelector(`form.genre`);
    const genreAnswers = Array.from(genreForm.querySelectorAll(`input[name="answer"]`));
    const sendAnswerButton = genreForm.querySelector(`.genre-answer-send`);

    const onAnswerChange = () => {
      const someAnswersChecked = genreAnswers.some((el) => el.checked === true);
      sendAnswerButton.disabled = !someAnswersChecked;
    };

    sendAnswerButton.disabled = true; // Кнопка «Ответить» отключена, пока не выбран ни один из вариантов ответа.

    genreAnswers.forEach((answer) => {
      answer.addEventListener(`change`, onAnswerChange);
    });

    sendAnswerButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const checkedAnswers = genreAnswers.filter((input) => input.checked).map((input) => input.value);
      this.onAnswerSend(checkedAnswers);
    });
  }

  pauseAllTracks() {
    this.players.map((it) =>{
      if (it.isPlaying()) {
        it.pauseTrack();
      }
    });
  }

  stopAllTracks() {
    this.players.map((it) => it.stopTrack());
  }

}
