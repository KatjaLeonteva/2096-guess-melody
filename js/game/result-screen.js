import {render} from "../util";
import {GAME_SETTINGS, results} from "../data/game";
import buttonReplay from "./button-replay";

let gameResult = (state) => {
  if (state.timeLeft === 0) {
    return `timeup`;
  }

  if (state.mistakes === GAME_SETTINGS.maxMistakes) {
    return `lose`;
  }

  return `win`;
};

const resultScreen = (gameState) => {
  const resultScreenTemplate = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
    <h2 class="title">${results[gameResult(gameState)].title}</h2>
    <div class="main-stat">${results[gameResult(gameState)].description}</div> <!-- показывать статистику для win -->
    <span class="main-comparison">${results[gameResult(gameState)].comparison}</span> <!-- показывать только для win -->
  </section>
  `;

  const resultScreenElement = render(resultScreenTemplate);
  resultScreenElement.appendChild(buttonReplay);

  return resultScreenElement;
};

export default resultScreen;
