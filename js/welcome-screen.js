/** @module Приветствие */

import {render, changeScreen} from "./util";
import gameScreenArtist from "./game-screen-artist";

const template = `
<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
</section>
`;

const welcomeScreen = render(template);
const playButton = welcomeScreen.querySelector(`.main-play`);

playButton.addEventListener(`click`, () => changeScreen(gameScreenArtist));

export default welcomeScreen;
