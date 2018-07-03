import AbstractView from "./abstract-view";
import PlayerView from "./player-view";

export default class ArtistView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
    this.question = this.model.currentQuestion;
    this.player = new PlayerView(this.model.audiosMap.get(this.question.src), true);

    const placeholder = this.element.querySelector(`.player`);
    placeholder.parentElement.replaceChild(this.player.element, placeholder);
  }

  get template() {
    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <h2 class="title main-title">${this.question.title}</h2>
      <div class="player"></div>
      <form class="main-list">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${answerValue}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview ${this.model.debug && answerData.correct ? `main-answer-preview--correct` : ``}" src="${answerData.track.image}"
                 alt="${answerData.track.artist}" width="134" height="134">
            ${answerData.track.artist}
          </label>
        </div>`).join(``)}
      </form>
    </div>
  </section>`;
  }

  onAnswerSend() {}

  bind() {
    // Обработчик для формы
    const artistForm = this.element.querySelector(`form.main-list`);
    const artistAnswers = Array.from(artistForm.querySelectorAll(`input[name="answer"]`));

    artistAnswers.forEach((answer) => {
      answer.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const checkedAnswers = artistAnswers.filter((input) => input.checked).map((input) => input.value);
        this.onAnswerSend(checkedAnswers);
      });
    });
  }

  pauseAllTracks() {
    if (this.player.isPlaying()) {
      this.player.pauseTrack();
    }
  }

  stopAllTracks() {
    this.player.stopTrack();
  }

}
