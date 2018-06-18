import {msToMinutesAndSeconds} from "../util";
import {GAME_SETTINGS} from "../data/game-data";
import render from "../render";
import changeScreen from "../game/change-screen";
import welcomeScreen from "../screens/welcome-screen";
import getRadius from '../game/get-radius';

const gameHeader = (state) => {
  const gameHeaderTemplate = `
  <div>
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        stroke-dasharray="${getRadius(state.timeLeft, GAME_SETTINGS.totalTime).stroke}"
        stroke-dashoffset="${getRadius(state.timeLeft, GAME_SETTINGS.totalTime).offset}"
        style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${msToMinutesAndSeconds(state.timeLeft).minutes.toString().padStart(2, `0`)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${msToMinutesAndSeconds(state.timeLeft).seconds.toString().padStart(2, `0`)}</span>
      </div>
    </svg>
    <div class="main-mistakes">
      ${new Array(state.mistakes)
    .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
    .join(``)}
    </div>
  </div>
  `;

  const gameHeaderElement = render(gameHeaderTemplate);

  // 3.6. В левом верхнем углу экрана появляется ссылка на приветственный экран.
  // Нажатие на эту ссылку возвращает пользователя на этот экран.
  // При нажатии на эту ссылку, пользователю сначала показывается диалоговое окно
  // с предупреждением, что вся его игра будет потеряна.
  const playAgainButton = gameHeaderElement.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    // TODO Добавить модальное окно
    changeScreen(welcomeScreen);
  });

  return gameHeaderElement;
};

export default gameHeader;
