/** @module Приветствие */

import {render, msToMinutesAndSeconds, pluralize} from "../util";
import {GAME_SETTINGS} from "../data/game-data";
import {startGame} from "../data/game";

const totalTimeMin = msToMinutesAndSeconds(GAME_SETTINGS.totalTime).minutes;
const maxMistakes = GAME_SETTINGS.maxMistakes;

const welcomeScreenTemplate = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${totalTimeMin} ${pluralize(totalTimeMin, `minutes`)} ответить на все вопросы.<br>
    Ошибиться можно ${maxMistakes} ${pluralize(maxMistakes, `attempts`)}.<br>
    Удачи!
  </p>
</section>
`;

const welcomeScreen = render(welcomeScreenTemplate);
const playButton = welcomeScreen.querySelector(`.main-play`);

playButton.addEventListener(`click`, () => startGame());

export default welcomeScreen;
