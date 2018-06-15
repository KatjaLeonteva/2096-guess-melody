import {gameSettings} from "../data/game-data";

export const calculatePoints = (answers, attempts) => {
  if (answers.length < gameSettings.questions) {
    return gameSettings.losePoints;
  }

  let attemptsLeft = attempts;

  return answers.reduce((points, answer) => {
    if (attemptsLeft > 0) {
      if (answer.correct) {
        points++;
        if (answer.time * 1000 < gameSettings.fastAnswerTime) {
          points++;
        }
      } else {
        points -= 2;
        attemptsLeft--;
      }
    } else {
      points = gameSettings.losePoints;
    }

    return points;
  }, 0);
};
