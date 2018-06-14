/** @module Игра на выбор жанра */

import {changeScreen, render} from '../util';
import renderHeader from "./game-header";
import resultScreenWin from "./result-screen-win";
import resultScreenTimeup from "./result-screen-timeup";
import resultScreenLose from "./result-screen-lose";

const renderScreenGenre = (state) => {
  const template = `
  <section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>
  `;

  const gameScreenGenre = render(template);
  // const playAgainButton = gameScreenGenre.querySelector(`.play-again`);
  const form = gameScreenGenre.querySelector(`form.genre`);
  const answers = Array.from(form.querySelectorAll(`input[name="answer"]`));
  const sendAnswerButton = form.querySelector(`.genre-answer-send`);

  gameScreenGenre.insertAdjacentElement(`afterbegin`, renderHeader());

  // const onPlayAgainClick = () => {
  //   resetScreen();
  //   changeScreen(welcomeScreen);
  // };

  const onAnswerChange = () => {
    const someAnswersChecked = answers.some((el) => el.checked === true);
    sendAnswerButton.disabled = !someAnswersChecked;
  };

  const onAnswerSend = () => {
    const resultScreens = [resultScreenWin, resultScreenTimeup, resultScreenLose];
    const randomScreen = resultScreens[Math.floor(Math.random() * resultScreens.length)];
    resetScreen();
    changeScreen(randomScreen());
  };

  const resetScreen = () => {
    answers.forEach((answer) => {
      answer.checked = false;
    });

    sendAnswerButton.disabled = true;
  };

  // playAgainButton.addEventListener(`click`, onPlayAgainClick);

  // Кнопка «Ответить» отключена, пока не выбран ни один из вариантов ответа.
  sendAnswerButton.disabled = true;

  answers.forEach((answer) => {
    answer.addEventListener(`change`, onAnswerChange);
  });

  sendAnswerButton.addEventListener(`click`, onAnswerSend);

  return gameScreenGenre;
};

export default renderScreenGenre;