const getComparison = (points, statistics) => {
  const updatedStatistics = statistics.concat(points).sort((a, b) => b - a);
  const players = updatedStatistics.length;

  if (players === 1) {
    return `Вы первый, кто сыграл в эту игру!`;
  }

  const place = updatedStatistics.indexOf(points) + 1;
  const rate = Math.round(((players - place) / players) * 100);
  return `Вы заняли ${place} место из ${players}. Это лучше, чем у ${rate}% игроков`;
};

export default getComparison;
