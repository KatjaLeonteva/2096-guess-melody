import {changeScreen, render} from "../util";
import {gameQuestions} from "../data/game-data";
import gameScreen from "./game-screen";

const buttonReplay = render(`<span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`);
// 4.2. При нажатии на кнопку Попробовать ещё раз пользователь попадает на первый вопрос
// с тем же набором вопросов, что и в прошлый раз.
buttonReplay.addEventListener(`click`, () => {
  // TODO Сбрасывать gameState
  changeScreen(gameScreen(gameQuestions[0]));
});

export default buttonReplay;
