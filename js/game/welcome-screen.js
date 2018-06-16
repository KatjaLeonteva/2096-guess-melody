/** @module Приветствие */

import {render, changeScreen, msToMinutesAndSeconds} from "../util";
import {GAME_SETTINGS, INITIAL_STATE} from "../data/game";
import gameScreen from "./game-screen";

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

let game;

const startGame = () => {
  game = Object.assign({}, INITIAL_STATE);
  changeScreen(gameScreen(game));
};

playButton.addEventListener(`click`, startGame);

export default welcomeScreen;
