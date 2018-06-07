const TOTAL_QUESTIONS = 10;
const FAST_ANSWER_TIME = 30; // 30 sec
const LOSE_POINTS = -1;

export const calculatePoints = (answers, attempts) => {
  if (answers.length < TOTAL_QUESTIONS) {
    return LOSE_POINTS;
  }

  let attemptsLeft = attempts;

  return answers.reduce((points, answer) => {
    if (attemptsLeft > 0) {
      if (answer.correct) {
        points++;
        if (answer.time < FAST_ANSWER_TIME) {
          points++;
        }
      } else {
        points -= 2;
        attemptsLeft--;
      }
    } else {
      points = LOSE_POINTS;
    }

    return points;
  }, 0);
};
