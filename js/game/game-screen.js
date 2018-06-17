import {changeScreen} from '../util';
import {gameQuestions} from "../data/game-data";
import {GAME_SETTINGS, checkAnswers} from "../data/game";
import screenArtist from "./game-screen-artist";
import screenGenre from "./game-screen-genre";
import gameHeader from "./game-header";
import resultScreen from "./result-screen";

const gameScreen = (gameState) => {
  const question = gameQuestions[gameState.level];

  const questionScreenMap = {
    guessArtist: screenArtist,
    chooseGenre: screenGenre
  };

  const onAnswerSend = (userAnswers) => {
    event.preventDefault();

    const isCorrect = checkAnswers(question, userAnswers);
    if (!isCorrect) {
      gameState.mistakes++;
    }

    const answerTime = 29000; // test time

    gameState.timeLeft = Math.max((gameState.timeLeft - answerTime), 0);

    gameState.answers.push({
      time: answerTime,
      correct: isCorrect
    });

    if ((gameState.mistakes === GAME_SETTINGS.maxMistakes) || (gameState.timeLeft === 0) || ((gameState.level + 1) === GAME_SETTINGS.totalQuestions)) {
      changeScreen(resultScreen(gameState));
    } else {
      gameState.level++;
      changeScreen(gameScreen(gameState));
    }
  };

  const gameScreenElement = questionScreenMap[question.type](question, onAnswerSend);
  gameScreenElement.insertAdjacentElement(`afterbegin`, gameHeader(gameState));

  return gameScreenElement;
};

export default gameScreen;
