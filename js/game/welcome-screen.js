/** @module Приветствие */

import {render, changeScreen, msToMinutesAndSeconds} from "../util";
import {gameSettings, gameQuestions} from "../data/game-data";
import gameScreen from "./game-screen";

const welcomeScreenTemplate = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${msToMinutesAndSeconds(gameSettings.totalTime).minutes} минут ответить на все вопросы.<br>
    Ошибиться можно ${gameSettings.maxMistakes} раза.<br>
    Удачи!
  </p>
</section>
`;

const welcomeScreen = render(welcomeScreenTemplate);
const playButton = welcomeScreen.querySelector(`.main-play`);

playButton.addEventListener(`click`, () => changeScreen(gameScreen(gameQuestions[0])));

export default welcomeScreen;
