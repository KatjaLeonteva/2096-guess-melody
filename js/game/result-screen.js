import {render} from "../util";
import {GAME_SETTINGS, INITIAL_STATE, results} from "../data/game";
import buttonReplay from "./button-replay";

// TODO временно
const gameState = Object.assign({}, INITIAL_STATE);

let gameResult = () => {
  if (gameState.timeLeft === 0) {
    return `timeup`;
  }

  if (gameState.mistakes === GAME_SETTINGS.maxMistakes) {
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
