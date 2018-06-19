const getRadius = (timeRatio, radius) => {
  const stroke = (2 * Math.PI * radius).toFixed();
  const offset = ((1 - timeRatio) * stroke).toFixed();

  return {stroke, offset};
};

export default getRadius;
