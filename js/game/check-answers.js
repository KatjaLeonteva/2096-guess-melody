/**
 * Проверяет ответы пользователя
 * @param {Object} question Вопрос
 * @param {Array} answers Ответы пользователя
 * @return {Boolean} Возвращает true, если выбраны только верные ответы
 */

const checkAnswers = (question, answers) => {
  const correctAnswers = [...Object.entries(question.answers)].reduce((arr, [answerValue, answerData]) => {
    if (answerData.correct) {
      arr.push(answerValue);
    }
    return arr;
  }, []);

  if (correctAnswers.length === answers.length) {
    return correctAnswers.every((elem) => answers.includes(elem));
  } else {
    return false;
  }
};

export default checkAnswers;
