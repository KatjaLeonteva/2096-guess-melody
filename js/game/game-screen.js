import {changeScreen, render} from '../util';
import {gameQuestions} from "../data/game-data";
import {GAME_SETTINGS} from "../data/game";
import gameHeader from "./game-header";
import resultScreen from "./result-screen";
import player from "./player";

const gameScreen = (gameState) => {
  console.log(gameState);
  const question = gameQuestions[gameState.level];

  const artistTemplate = `
    <section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        ${player(question.trackSrc)}
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
            ${player(answerData.track.src)}
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

  const checkAnswers = (answers) => {
    // TODO Проверять ответы. Если неверно gameState.mistakes++ и return false
    return true;
  };

  const onAnswerSend = (userAnswers) => {
    event.preventDefault();

    let answerTime = 29000; // test time

    gameState.timeLeft = Math.max((gameState.timeLeft - answerTime), 0);

    gameState.answers.push({
      time: answerTime,
      correct: checkAnswers(userAnswers)
    });

    if ((gameState.mistakes === GAME_SETTINGS.maxMistakes) || (gameState.timeLeft === 0) || ((gameState.level + 1) === GAME_SETTINGS.totalQuestions)) {
      changeScreen(resultScreen(gameState));
    } else {
      gameState.level++;
      changeScreen(gameScreen(gameState));
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
