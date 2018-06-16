import {changeScreen, render} from '../util';
import {gameState, gameQuestions, gameSettings} from "../data/game-data";
import gameHeader from "./game-header";
import resultScreen from "./result-screen";

const gameScreen = (question) => {
  const artistTemplate = `
    <section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${question.track}"></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${[...Object.entries(question.answers)].map(([answerValue, answerData], index) =>
          `<div class="main-answer-wrapper">
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

  const genreTemplate = `
    <section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">${question.title}</h2>
        <form class="genre">
          ${[...Object.entries(question.answers)].map(([answerValue, answerData], index) =>
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
            <input type="checkbox" name="answer" value="${answerValue}" id="a-${index + 1}">
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
  gameScreenElement.insertAdjacentElement(`afterbegin`, gameHeader(gameState));

  // TODO Проверять ответы
  const checkAnswers = (answers) => {
    console.log(answers);
    return true;
  };

  const onAnswerSend = (userAnswers) => {
    event.preventDefault();
    const questionIndex = gameState.answers.length;

    gameState.answers.push({
      time: 1000,
      correct: checkAnswers(userAnswers)
    });

    if ((questionIndex + 1) < gameSettings.totalQuestions) {
      changeScreen(gameScreen(gameQuestions[questionIndex + 1]));
    } else {
      changeScreen(resultScreen);
    }
  };

  if (question.type === `guessArtist`) {
    const artistForm = gameScreenElement.querySelector(`form.main-list`);
    const artistAnswers = Array.from(artistForm.querySelectorAll(`input[name="answer"]`));
    artistAnswers.forEach((answer) => {
      answer.addEventListener(`change`, () => {
        const checkedAnswers = artistAnswers.filter((input) => input.checked).map((input) => input.value);
        onAnswerSend(checkedAnswers);
      });
    });
  } else if (question.type === `chooseGenre`) {
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

    sendAnswerButton.addEventListener(`click`, () => {
      const checkedAnswers = genreAnswers.filter((input) => input.checked).map((input) => input.value);
      onAnswerSend(checkedAnswers);
    });
  }

  return gameScreenElement;
};

export default gameScreen;
