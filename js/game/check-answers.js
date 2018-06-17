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
