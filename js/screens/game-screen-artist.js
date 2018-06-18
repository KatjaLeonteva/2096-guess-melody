/** @module Игра на выбор исполнителя */

import render from '../render';
import player from '../components/player';

const screenArtist = (question, callback) => {
  const template = `
  <section class="main main--level main--level-artist">
    <div class="main-wrap">
      <h2 class="title main-title">${question.title}</h2>
      ${player(question.trackSrc)}
      <form class="main-list">
        ${[...Object.entries(question.answers)].map(([answerValue, answerData], index) => `
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
  </section>
  `;

  const screenArtistElement = render(template);

  const artistForm = screenArtistElement.querySelector(`form.main-list`);
  const artistAnswers = Array.from(artistForm.querySelectorAll(`input[name="answer"]`));

  artistAnswers.forEach((answer) => {
    answer.addEventListener(`change`, () => {
      const checkedAnswers = artistAnswers.filter((input) => input.checked).map((input) => input.value);
      callback(checkedAnswers);
    });
  });

  return screenArtistElement;
};

export default screenArtist;
