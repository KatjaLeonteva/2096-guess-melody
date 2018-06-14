/** @module Результат игры: выигрыш */

import {render} from '../util';
import buttonReplay from "./button-replay";
import {results} from "../data/game-data";

const renderScreenWin = () => {
  const template = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${results.win.title}</h2>
    <div class="main-stat">${results.win.stat}</div>
    <span class="main-comparison">${results.win.comparison}</span>
  </section>
  `;

  const resultScreenWin = render(template);
  resultScreenWin.appendChild(buttonReplay); // Должно быть написано "Сыграть ещё раз", а не "Попробовать"

  return resultScreenWin;
};

export default renderScreenWin;
