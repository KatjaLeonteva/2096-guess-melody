import {GAME_SETTINGS, gameQuestions} from "../data/game-data";
import changeScreen from "../game/change-screen";
import checkAnswers from "../game/check-answers";
import gameHeader from "../components/header";
import resultScreen from "./result-screen";

import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";

const gameScreen = (gameState) => {
  const question = gameQuestions[gameState.level];

  const questionScreenMap = {
    guessArtist: ArtistView,
    chooseGenre: GenreView
  };

  //const allPlayers = Array.from(gameScreenElement.querySelectorAll(`.player`));
  //
  //const pauseTrack = (player) => {
  //  player.querySelector(`audio`).pause();
  //  player.querySelector(`.player-control`).classList.replace(`player-control--pause`, `player-control--play`);
  //};
  //
  //const playTrack = (player) => {
  //  player.querySelector(`audio`).play();
  //  player.querySelector(`.player-control`).classList.replace(`player-control--play`, `player-control--pause`);
  //};
  //
  //allPlayers.forEach((player) => {
  //  player.addEventListener(`click`, (evt) => {
  //    evt.preventDefault();
  //    const selectedTrack = player.querySelector(`audio`);
  //    let isPlaying = (selectedTrack.duration > 0 && !selectedTrack.paused);
  //
  //    if (isPlaying) {
  //      pauseTrack(player);
  //    } else {
  //      allPlayers.forEach((plr) => pauseTrack(plr));
  //      playTrack(player);
  //    }
  //  });
  //});
  //
  //return gameScreenElement;

  const screen = new questionScreenMap[question.type](question);
  screen.element.insertAdjacentElement(`afterbegin`, gameHeader(gameState));

  screen.onAnswerSend = (userAnswers) => {
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

    if ((gameState.mistakes > GAME_SETTINGS.maxMistakes) || (gameState.timeLeft === 0) || ((gameState.level + 1) === GAME_SETTINGS.totalQuestions)) {
      changeScreen(resultScreen(gameState));
    } else {
      gameState.level++;
      changeScreen(gameScreen(gameState));
    }
  };

  return screen.element;
};

export default gameScreen;
