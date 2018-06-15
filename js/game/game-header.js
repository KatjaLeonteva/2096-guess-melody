import {changeScreen, render, msToMinutesAndSeconds} from "../util";
import welcomeScreen from "./welcome-screen";

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

  const playAgainButton = gameHeaderElement.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => changeScreen(welcomeScreen));

  return gameHeaderElement;
};

export default gameHeader;
