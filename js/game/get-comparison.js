const getComparison = (points, statistics) => {
  const players = statistics.length;

  if (players === 1) {
    return `Вы первый, кто сыграл в эту игру!`;
  }

  const place = statistics.indexOf(points) + 1;
  const rate = Math.round(((players - place) / players) * 100);
  return `Вы заняли ${place} место из ${players}. Это лучше, чем у ${rate}% игроков`;
};

export default getComparison;
