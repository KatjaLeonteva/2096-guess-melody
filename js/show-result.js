export const showResult = (scores, gameResult) => {
  if (gameResult.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (gameResult.attemptsLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  const newScores = scores.concat(gameResult.points).sort((a, b) => a - b);
  const players = newScores.length;
  const place = players - newScores.indexOf(gameResult.points);
  const rate = Math.round(((players - place) / players) * 100);

  return `Вы заняли ${place} место из ${players} игроков. Это лучше, чем у ${rate}% игроков`;
};
