import {GAME_SETTINGS} from "../data/game";

export const calculatePoints = (gameState) => {
  if (gameState.answers.length < GAME_SETTINGS.totalQuestions) {
    return GAME_SETTINGS.losePoints;
  }

  let attemptsLeft = GAME_SETTINGS.maxMistakes;

  return gameState.answers.reduce((points, answer) => {
    if (attemptsLeft > 0) {
      if (answer.correct) {
        if (answer.time < GAME_SETTINGS.fastAnswerTime) {
          points += GAME_SETTINGS.fastPoints;
        } else {
          points += GAME_SETTINGS.regularPoints;
        }
      } else {
        points += GAME_SETTINGS.wrongPoints;
        attemptsLeft--;
      }
    } else {
      points = GAME_SETTINGS.losePoints;
    }

    return points;
  }, 0);
};
