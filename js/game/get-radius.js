const getRadius = (timeLeft, timeTotal) => {
  const radius = 370;
  const timerStep = 1000; // 1 sec

  const circleLen = Math.ceil(2 * Math.PI * radius);
  const offsetStep = circleLen / (timeTotal / timerStep);

  return {
    stroke: circleLen,
    offset: ((timeTotal - timeLeft) / timeTotal) * offsetStep
  };
};

export default getRadius;
