const QuestionType = {
  artist: `guessArtist`,
  genre: `chooseGenre`
};

const preProcessType = (type) => {
  return QuestionType[type];
};

const preProcessArtistAnswers = (answers) => {
  let newAnswers = {};

  answers.forEach((answer, index) => {
    newAnswers[`val-${index}`] = {
      track: {
        artist: answer.title,
        image: answer.image.url
      },
      correct: answer.isCorrect
    };
  });

  return newAnswers;
};

const preProcessGenreAnswers = (answers, genre) => {
  let newAnswers = {};

  answers.forEach((answer, index) => {
    newAnswers[`val-${index}`] = {
      track: {
        src: answer.src
      },
      correct: answer.genre === genre
    };
  });

  return newAnswers;
};

const adaptServerData = (data) => {

  for (const question of data) {
    question.type = preProcessType(question.type);

    question.title = question.question;

    if (question.type === QuestionType.artist) {
      question.answers = preProcessArtistAnswers(question.answers);
    } else if (question.type === QuestionType.genre) {
      question.answers = preProcessGenreAnswers(question.answers, question.genre);
    }
  }

  return data;
};

export default adaptServerData;
