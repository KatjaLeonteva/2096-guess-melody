var getRadius = (function () {
  'use strict';

  const getRadius = (timeRatio, radius) => {
    const stroke = (2 * Math.PI * radius).toFixed(); // Circumference of a circle is 2 * Pi * r
    const offset = ((1 - timeRatio) * stroke).toFixed();

    return {stroke, offset};
  };

  return getRadius;

}());

//# sourceMappingURL=get-radius.js.map
