import {render} from "../util";
import {gameState, gameSettings, results} from "../data/game-data";
import buttonReplay from "./button-replay";

let gameResult = () => {
  if (gameState.timeLeft === 0) {
    return `timeup`;
  }

  if (gameState.mistakes === gameSettings.maxMistakes) {
    return `lose`;
  }

  return `win`;
};


const resultScreenTemplate = `
<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${results[gameResult()].title}</h2>
  <div class="main-stat">${results[gameResult()].description}</div> <!-- показывать статистику для win -->
  <span class="main-comparison">${results[gameResult()].comparison}</span> <!-- показывать только для win -->
</section>
`;

const resultScreen = render(resultScreenTemplate);
resultScreen.appendChild(buttonReplay);

export default resultScreen;
