/** @module Результат игры: проигрыш закончились попытки */

import {render} from "../util";
import buttonReplay from "./button-replay";
import {results} from "../data/game-data";

const renderScreenLose = () => {
  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${results.lose.title}</h2>
    <div class="main-stat">${results.lose.description}</div>
  </section>
  `;

  const resultScreenLose = render(template);
  resultScreenLose.appendChild(buttonReplay);

  return resultScreenLose;
};

export default renderScreenLose;
