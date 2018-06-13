import {assert} from "chai";
import {calculatePoints} from "./calculate-points";

describe(`Check points calculator`, () => {
  it(`should return -1 if answered less than 10 answers`, () => {
    assert.equal(calculatePoints([
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60}
    ], 3), -1);
  });

  it(`should return -1 if used all attempts`, () => {
    assert.equal(calculatePoints([
      {correct: true, time: 60},
      {correct: false, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: false, time: 60},
      {correct: true, time: 60},
      {correct: false, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60}
    ], 3), -1);
    assert.equal(calculatePoints([
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: false, time: 10},
      {correct: false, time: 10}
    ], 1), -1);
  });

  it(`should return 10 if all answers are correct and slow`, () => {
    assert.equal(calculatePoints([
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60},
      {correct: true, time: 60}
    ], 3), 10);
  });

  it(`should return 20 if all answers are correct and fast`, () => {
    assert.equal(calculatePoints([
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20},
      {correct: true, time: 20}
    ], 3), 20);
  });

  it(`should return between 0 and 20`, () => {
    assert.match(calculatePoints([
      {correct: true, time: 10},
      {correct: false, time: 20},
      {correct: true, time: 30},
      {correct: false, time: 40},
      {correct: true, time: 50},
      {correct: true, time: 10},
      {correct: true, time: 20},
      {correct: true, time: 30},
      {correct: true, time: 40},
      {correct: true, time: 50}
    ], 3), /^([0-1]?[0-9]|20)$/);
  });
});

