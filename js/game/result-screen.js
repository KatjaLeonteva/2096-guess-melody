import {render} from "../util";
import buttonReplay from "./button-replay";
import {showResult} from "./show-result";

const resultScreen = (gameState) => {
  const resultScreenTemplate = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
    <h2 class="title">${showResult(gameState).title}</h2>
    <div class="main-stat">${showResult(gameState).description}</div>
    <span class="main-comparison">${showResult(gameState).comparison}</span> <!-- TODO Как показывать только для win? -->
  </section>
  `;

  const resultScreenElement = render(resultScreenTemplate);
  resultScreenElement.appendChild(buttonReplay);

  return resultScreenElement;
};

export default resultScreen;
