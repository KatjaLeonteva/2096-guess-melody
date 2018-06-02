/** @module Результат игры: проигрыш закончились попытки */

import {render, changeScreen} from "./util";
import gameScreenArtist from "./game-screen-artist";

const template = `
<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>
`;

const resultScreenLose = render(template);
const playAgainButton = resultScreenLose.querySelector(`.main-replay`);

playAgainButton.addEventListener(`click`, () => changeScreen(gameScreenArtist));

export default resultScreenLose;
