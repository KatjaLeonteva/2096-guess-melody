(function (chai) {
  'use strict';

  const getRadius = (timeRatio, radius) => {
    const stroke = (2 * Math.PI * radius).toFixed(); // Circumference of a circle is 2 * Pi * r
    const offset = ((1 - timeRatio) * stroke).toFixed();

    return {stroke, offset};
  };

  describe(`Function should correctly calculate circle length`, () => {
    describe(`Normal cases`, () => {
      it(`Should return full length and 0 in initial state`, () => {
        // 2 * 3.14 * 100 = 6.28 * 100 = 628
        chai.assert.equal(getRadius(1, 100).stroke, 628);
        chai.assert.equal(getRadius(1, 100).offset, 0);
      });

      it(`Should return 0 and full length in the final state`, () => {
        // 2 * 3.14 * 100 = 6.28 * 100 = 628
        chai.assert.equal(getRadius(0, 100).stroke, 628);
        chai.assert.equal(getRadius(0, 100).offset, 628);
      });

      it(`Offset and length should be equal on a half`, () => {
        // 2 * 3.14 * 100 / 2 = 3.14 * 100 = 314
        chai.assert.equal(getRadius(0.5, 100).stroke, 628);
        chai.assert.equal(getRadius(0.5, 100).offset, 314);
      });
    });
  });

}(chai));

//# sourceMappingURL=get-radius.test.js.map
