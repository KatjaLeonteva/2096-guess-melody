import {changeScreen, render} from '../util';
import {initialState, gameQuestions} from "../data/game-data";
import gameHeader from "./game-header";

const gameScreen = (question) => {
  const artistTemplate = `
    <section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${question.track}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${[...Object.entries(question.answers)].map(([answerId, answerData], index) =>
          `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="${answerId}" name="answer" value="val-${index + 1}"/>
            <label class="main-answer" for="${answerId}">
              <img class="main-answer-preview" src="${answerData.track.image}"
                   alt="${answerData.track.name}" width="134" height="134">
              ${answerData.track.name}
            </label>
          </div>`).join(``)}
        </form>
      </div>
    </section>
  `;

  const genreTemplate = `
    <section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">${question.title}</h2>
        <form class="genre">
          ${[...Object.entries(question.answers)].map(([answerId, answerData], index) =>
          `<div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${answerData.track.src}"></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>`).join(``)}

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>
  `;

  const questionTemplateMap = {
    guessArtist: artistTemplate,
    chooseGenre: genreTemplate
  };

  const gameScreenElement = render(questionTemplateMap[question.type]);
  gameScreenElement.insertAdjacentElement(`afterbegin`, gameHeader(initialState));

  const onAnswerSend = () => {
    changeScreen(gameScreen(gameQuestions[6]));
  };

  if (question.type == `guessArtist`) {
    const artistForm = gameScreenElement.querySelector(`form.main-list`);
    const artistAnswers = Array.from(artistForm.querySelectorAll(`.main-answer`));
    artistAnswers.forEach((answer) => {
      // Записывать ответ и время в gameState
      answer.addEventListener(`click`, onAnswerSend);
    });
  } else if (question.type == `chooseGenre`) {
    const genreForm = gameScreenElement.querySelector(`form.genre`);
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

    sendAnswerButton.addEventListener(`click`, onAnswerSend);
  }

  return gameScreenElement;
};

export default gameScreen;
