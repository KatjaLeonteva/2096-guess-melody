var getResult = (function () {
  'use strict';

  // Варианты склонения для 1 шт, 2-4 шт, 0 и 5-20 шт
  const cases = {
    minutes: [`минуту`, `минуты`, `минут`],
    seconds: [`секунду`, `секунды`, `секунд`],
    points: [`балл`, `балла`, `баллов`],
    mistakes: [`ошибку`, `ошибки`, `ошибок`],
    attempts: [`раз`, `раза`, `раз`],
    fast: [`быстрый`, `быстрых`, `быстрых`]
  };

  const TimeInMs = {
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
  };

  /**
   * Переводит миллисекунды в минуты и секунды
   * @param {number} ms Миллисекунды.
   * @return {object} Время в минутах и секундах
   */
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / TimeInMs.ONE_MINUTE);
    const seconds = ((ms % TimeInMs.ONE_MINUTE) / TimeInMs.ONE_SECOND).toFixed(0);
    return {minutes, seconds};
  };

  /**
   * Возвращает существительное в правильном склонении
   * в зависимости от стоящего перед ним числа
   * @param {number} number Число
   * @param {string} noun Существительное
   * @return {string} Существительное в правильном склонении
   */
  const pluralize = (number, noun) => {
    const nouns = cases[noun];

    let n = Math.abs(number);

    // Ends in 1, excluding 11
    if (n % 10 === 1 && n % 100 !== 11) {
      return nouns[0];
    }
    // Ends in 2-4, excluding 12-14
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return nouns[1];
    }

    // Everything else
    return nouns[2];
  };

  const GAME_SETTINGS = {
    totalQuestions: 10,
    totalTime: 300000, // 5 min in ms
    fastAnswerTime: 30000, // 30 sec in ms
    maxMistakes: 2,
    losePoints: -1,
    regularPoints: 1,
    fastPoints: 2,
    wrongPoints: -2
  };

  const GameStatus = {
    TIMEUP: `timeup`,
    LOSE: `lose`,
    WIN: `win`,
    CONTINUE: `continue`
  };

  const INITIAL_STATE = Object.freeze({
    level: 0,
    timeLeft: GAME_SETTINGS.totalTime,
    mistakes: 0,
    answers: []
  });

  const getResult = (state, output, points) => {
    let result;

    switch (output) {
      case GameStatus.TIMEUP:
        result = {
          title: `Увы и ах!`,
          description: `Время вышло!<br>Вы не успели отгадать все мелодии`
        };
        break;
      case GameStatus.LOSE:
        result = {
          title: `Какая жалость!`,
          description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
        };
        break;
      case GameStatus.WIN: {
        const time = msToMinutesAndSeconds(GAME_SETTINGS.totalTime - state.timeLeft);
        const fastAnswers = state.answers.filter((answer) => answer.correct && answer.time < GAME_SETTINGS.fastAnswerTime).length;

        result = {
          title: `Вы настоящий меломан!`,
          description: `За&nbsp;${time.minutes}&nbsp;${pluralize(time.minutes, `minutes`)} и ${time.seconds}&nbsp;${pluralize(time.seconds, `seconds`)}
        <br>вы&nbsp;набрали ${points} ${pluralize(points, `points`)} (${fastAnswers} ${pluralize(fastAnswers, `fast`)})
        <br>совершив ${state.mistakes}&nbsp;${pluralize(state.mistakes, `mistakes`)}`
        };
        break;
      }
      default: {
        throw new Error(`Unknown result: ${output}`);
      }
    }

    return result;
  };

  return getResult;

}());

//# sourceMappingURL=get-result.js.map
