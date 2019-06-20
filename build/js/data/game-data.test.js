(function (chai) {
  'use strict';

  describe(`Array`, () => {
    describe(`#indexOf()`, () => {
      it(`should return -1 when the value is not present`, () => {
        chai.assert.equal(-1, [1, 2, 3].indexOf(4));
      });
    });
  });

}(chai));

//# sourceMappingURL=game-data.test.js.map
