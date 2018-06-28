import {assert} from "chai";
import calculatePoints from "./calculate-points";
import {GameStatus} from "../data/game-data";

describe(`Check points calculator`, () => {
  it(`should return -1 if answered less than 10 answers`, () => {
    assert.equal(calculatePoints({answers: [
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000}
    ], mistakes: 0}, GameStatus.TIMEUP), -1);
  });

  it(`should return -1 if used all attempts`, () => {
    assert.equal(calculatePoints({answers: [
      {correct: true, time: 60000},
      {correct: false, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: false, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: false, time: 60000},
      {correct: true, time: 60000}
    ], mistakes: 3}, GameStatus.LOSE), -1);
    assert.equal(calculatePoints({answers: [
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: true, time: 10000},
      {correct: false, time: 10000},
      {correct: false, time: 10000},
      {correct: false, time: 10000}
    ], mistakes: 3}, GameStatus.LOSE), -1);
  });

  it(`should return 10 if all answers are correct and slow`, () => {
    assert.equal(calculatePoints({answers: [
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000},
      {correct: true, time: 60000}
    ], mistakes: 0}, GameStatus.WIN), 10);
  });

  it(`should return 20 if all answers are correct and fast`, () => {
    assert.equal(calculatePoints({answers: [
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000},
      {correct: true, time: 20000}
    ], mistakes: 0}, GameStatus.WIN), 20);
  });

  it(`should return between 0 and 20`, () => {
    assert.match(calculatePoints({answers: [
      {correct: true, time: 10000},
      {correct: false, time: 20000},
      {correct: true, time: 30000},
      {correct: false, time: 40000},
      {correct: true, time: 50000},
      {correct: true, time: 10000},
      {correct: true, time: 20000},
      {correct: true, time: 30000},
      {correct: true, time: 40000},
      {correct: true, time: 50000}
    ], mistakes: 2}, GameStatus.WIN), /^([0-1]?[0-9]|20)$/);
  });
});
