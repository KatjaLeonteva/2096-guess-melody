import {GAME_SETTINGS} from "../data/game-data";

const calculatePoints = (gameState, gameOutput) => {
  if (gameOutput === `timeup` || gameOutput === `lose`) {
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
