import {GAME_SETTINGS, gameQuestions} from "../data/game-data";
import changeScreen from "../game/change-screen";
import checkAnswers from "../game/check-answers";
import resultScreen from "./result-screen";
import welcomeScreen from "./welcome-screen";

import LogoView from "../views/logo-view";
import TimerView from "../views/timer-view";
import MistakesView from "../views/mistakes-view";
import ArtistView from "../views/artist-view";
import GenreView from "../views/genre-view";
import ConfirmView from "../views/confirm-view";

const GameView = {
  guessArtist: ArtistView,
  chooseGenre: GenreView
};

const gameScreen = (gameState) => {
  const question = gameQuestions[gameState.level];

  const screen = new GameView[question.type](question);
  const wrapper = screen.element.querySelector(`.main-wrap`);
  const logo = new LogoView();
  const timer = new TimerView(gameState.timeLeft, GAME_SETTINGS.totalTime);
  const mistakes = new MistakesView(gameState.mistakes);

  screen.element.insertBefore(logo.element, wrapper);
  screen.element.insertBefore(timer.element, wrapper);
  screen.element.insertBefore(mistakes.element, wrapper);


  screen.onAnswerSend = (userAnswers) => {
    event.preventDefault();

    const isCorrect = checkAnswers(question, userAnswers);
    if (!isCorrect) {
      gameState.mistakes++;
      // TODO re-render mistakes
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

  const pauseTrack = (player) => {
    player.querySelector(`audio`).pause();
    player.querySelector(`.player-control`).classList.replace(`player-control--pause`, `player-control--play`);
  };

  const playTrack = (player, otherPlayers) => {
    otherPlayers.forEach((plr) => pauseTrack(plr));
    player.querySelector(`audio`).play();
    player.querySelector(`.player-control`).classList.replace(`player-control--play`, `player-control--pause`);
  };

  screen.onPauseTrack = (player) => pauseTrack(player);

  screen.onPlayTrack = (player, otherPlayers) => playTrack(player, otherPlayers);

  logo.onLogoClick = () => {
    const modal = new ConfirmView(`Вы уверены что хотите начать игру заново?`);
    modal.onConfirm = () => changeScreen(welcomeScreen());
    modal.onCancel = () => screen.element.removeChild(modal.element);

    screen.element.appendChild(modal.element);
  };

  return screen.element;
};

export default gameScreen;
