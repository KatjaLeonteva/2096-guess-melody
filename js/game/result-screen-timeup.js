/** @module Результат игры: проигрыш время вышло */

import {render} from "../util";
import buttonReplay from "./button-replay";
import {results} from "../data/game-data";

const renderScreenTimeup = () => {

  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${results.timeup.title}</h2>
    <div class="main-stat">${results.timeup.description}</div>
  </section>
  `;

  const resultScreenTimeup = render(template);
  resultScreenTimeup.appendChild(buttonReplay);

  return resultScreenTimeup;
};

export default renderScreenTimeup;
