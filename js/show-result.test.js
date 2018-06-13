import {assert} from "chai";
import {showResult} from "./show-result";

const testStatistics = [6, 4, 12, 8];

// Лучший результат
const testAnswersSuccess1 =
  {
    timeLeft: 40,
    attemptsLeft: 3,
    points: 20
  };

// Средний рехультат
const testAnswersSuccess2 =
  {
    timeLeft: 30,
    attemptsLeft: 2,
    points: 10
  };

// Плохой результат
const testAnswersSuccess3 =
  {
    timeLeft: 5,
    attemptsLeft: 1,
    points: 1
  };

// Проигрыш, время вышло
const testAnswersTime1 =
  {
    timeLeft: 0,
    attemptsLeft: 2,
    points: -1
  };

// Проигрыш, вышло время и закончились попытки
const testAnswersTime2 =
  {
    timeLeft: 0,
    attemptsLeft: 0,
    points: -1
  };

// Проигрыш, закончились попытки
const testAnswersAttempts1 =
  {
    timeLeft: 20,
    attemptsLeft: 0,
    points: 5
  };

describe(`Check show result`, () => {
  it(`should show best result`, () => {
    assert.equal(showResult(testStatistics, testAnswersSuccess1), `Вы заняли 1 место из 5 игроков. Это лучше, чем у 80% игроков`);
  });

  it(`should show result with statistics`, () => {
    assert.equal(showResult(testStatistics, testAnswersSuccess2), `Вы заняли 2 место из 5 игроков. Это лучше, чем у 60% игроков`);
  });

  it(`should show result worst result`, () => {
    assert.equal(showResult(testStatistics, testAnswersSuccess3), `Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });

  it(`should show time out message`, () => {
    assert.equal(showResult(testStatistics, testAnswersTime1), `Время вышло! Вы не успели отгадать все мелодии`);
    assert.equal(showResult(testStatistics, testAnswersTime2), `Время вышло! Вы не успели отгадать все мелодии`);
  });

  it(`should show lose message`, () => {
    assert.equal(showResult(testStatistics, testAnswersAttempts1), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});
