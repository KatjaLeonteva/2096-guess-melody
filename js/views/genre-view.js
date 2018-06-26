import AbstractView from "./abstract-view";
import PlayerView from "./player-view";

export default class GenreView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">${this.question.title}</h2>
      <form class="genre">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="genre-answer">
          ${new PlayerView(answerData.track.src).template}
          <input type="checkbox" name="answer" value="${answerValue}" id="a-${index + 1}">
          <label class="genre-answer-check" for="a-${index + 1}"></label>
        </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;
  }

  onAnswerSend() {}

  onPauseTrack() {}

  onPlayTrack() {}

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

    sendAnswerButton.addEventListener(`click`, () => {
      const checkedAnswers = genreAnswers.filter((input) => input.checked).map((input) => input.value);
      this.onAnswerSend(checkedAnswers);
    });

    // Обработчик для плеера
    const allPlayers = Array.from(this.element.querySelectorAll(`.player`));

    allPlayers.forEach((player) => {
      player.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const audio = player.querySelector(`audio`);
        if (audio.duration > 0 && !audio.paused) {
          this.onPauseTrack(player);
        } else {
          this.onPlayTrack(player, allPlayers);
        }
      });
    });
  }
}
