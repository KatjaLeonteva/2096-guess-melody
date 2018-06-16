/** @module Приветствие */

import {render, msToMinutesAndSeconds} from "../util";
import {GAME_SETTINGS, startGame} from "../data/game";

const welcomeScreenTemplate = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${msToMinutesAndSeconds(GAME_SETTINGS.totalTime).minutes} минут ответить на все вопросы.<br>
    Ошибиться можно ${GAME_SETTINGS.maxMistakes} раза.<br>
    Удачи!
  </p>
</section>
`;

const welcomeScreen = render(welcomeScreenTemplate);
const playButton = welcomeScreen.querySelector(`.main-play`);

playButton.addEventListener(`click`, () => startGame());

export default welcomeScreen;
