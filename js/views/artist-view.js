import AbstractView from "./abstract-view";
import PlayerView from "./player-view";

export default class ArtistView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <h2 class="title main-title">${this.question.title}</h2>
      ${new PlayerView(this.question.trackSrc).template}
      <form class="main-list">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${answerValue}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview" src="${answerData.track.image}"
                 alt="${answerData.track.name}" width="134" height="134">
            ${answerData.track.name}
          </label>
        </div>`).join(``)}
      </form>
    </div>
  </section>`;
  }

  onAnswerSend() {}

  bind() {
    const artistForm = this.element.querySelector(`form.main-list`);
    const artistAnswers = Array.from(artistForm.querySelectorAll(`input[name="answer"]`));

    artistAnswers.forEach((answer) => {
      answer.addEventListener(`change`, () => {
        const checkedAnswers = artistAnswers.filter((input) => input.checked).map((input) => input.value);
        this.onAnswerSend(checkedAnswers);
      });
    });
  }
}
