import getOutput from "../game/get-output";
import getResult from "../game/get-result";
import startGame from "../game/start-game";
import ResultView from "../views/result-view";
import ReplayView from "../views/replay-view";

const resultScreen = (gameState) => {
  const gameOutput = getOutput(gameState);
  const screen = new ResultView(getResult(gameState, gameOutput), gameOutput);
  const replay = new ReplayView((gameOutput === `win` ? `Сыграть` : `Попробовать`) + ` ещё раз`);

  // ТЗ 4.2. При нажатии на кнопку Попробовать ещё раз
  // пользователь попадает на первый вопрос
  // с тем же набором вопросов, что и в прошлый раз.
  replay.onReplayButtonClick = () => startGame();
  screen.element.appendChild(replay.element);

  return screen.element;
};

export default resultScreen;
