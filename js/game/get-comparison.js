var getComparison = (function () {
  'use strict';

  const getComparison = (points, statistics) => {
    statistics.sort((a, b) => b - a);
    const playersCount = statistics.length;

    if (playersCount === 1) {
      return `Вы первый, кто сыграл в эту игру!`;
    }

    const place = statistics.indexOf(points) + 1;
    const rate = Math.round(((playersCount - place) / playersCount) * 100);
    return `Вы заняли ${place} место из ${playersCount}. Это лучше, чем у ${rate}% игроков`;
  };

  return getComparison;

}());

//# sourceMappingURL=get-comparison.js.map
