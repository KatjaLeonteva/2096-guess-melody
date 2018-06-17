/** @module Игра на выбор жанра */

import {render} from '../util';
import player from "./player";

const screenGenre = (question, callback) => {
  const template = `
  <section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">${question.title}</h2>
      <form class="genre">
        ${[...Object.entries(question.answers)].map(([answerValue, answerData], index) => `
        <div class="genre-answer">
          ${player(answerData.track.src)}
          <input type="checkbox" name="answer" value="${answerValue}" id="a-${index + 1}">
          <label class="genre-answer-check" for="a-${index + 1}"></label>
        </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>
  `;

  const screenGenreElement = render(template);
  const genreForm = screenGenreElement.querySelector(`form.genre`);
  const genreAnswers = Array.from(genreForm.querySelectorAll(`input[name="answer"]`));
  const sendAnswerButton = genreForm.querySelector(`.genre-answer-send`);

  const onAnswerChange = () => {
    const someAnswersChecked = genreAnswers.some((el) => el.checked === true);
    sendAnswerButton.disabled = !someAnswersChecked;
  };

  // Кнопка «Ответить» отключена, пока не выбран ни один из вариантов ответа.
  sendAnswerButton.disabled = true;

  genreAnswers.forEach((answer) => {
    answer.addEventListener(`change`, onAnswerChange);
  });

  sendAnswerButton.addEventListener(`click`, () => {
    const checkedAnswers = genreAnswers.filter((input) => input.checked).map((input) => input.value);
    callback(checkedAnswers);
  });

  return screenGenreElement;
};

export default screenGenre;
