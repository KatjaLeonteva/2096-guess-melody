var util = (function (exports) {
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

  exports.TimeInMs = TimeInMs;
  exports.msToMinutesAndSeconds = msToMinutesAndSeconds;
  exports.pluralize = pluralize;

  return exports;

}({}));

//# sourceMappingURL=util.js.map
