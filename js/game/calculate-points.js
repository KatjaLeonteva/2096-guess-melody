import {GAME_SETTINGS} from "../data/game-data";

const calculatePoints = (gameState) => {
  // TODO Здесь можно просто проверять output === `timeup` или `lose`
  if ((gameState.answers.length < GAME_SETTINGS.totalQuestions) || (gameState.mistakes > GAME_SETTINGS.maxMistakes)) {
    return GAME_SETTINGS.losePoints;
  }

  return gameState.answers.reduce((points, answer) => {
    if (answer.correct) {
      points += (answer.time < GAME_SETTINGS.fastAnswerTime) ? GAME_SETTINGS.fastPoints : GAME_SETTINGS.regularPoints;
    } else {
      points += GAME_SETTINGS.wrongPoints;
    }
    return points;
  }, 0);
};

export default calculatePoints;
