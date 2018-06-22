import {msToMinutesAndSeconds, pluralize} from "../util";
import {GAME_SETTINGS, statistics} from "../data/game-data";
import {calculatePoints} from "./calculate-points";

const getOutput = (state) => {
  if (state.timeLeft === 0) {
    return `timeup`;
  }

  if (state.mistakes > GAME_SETTINGS.maxMistakes) {
    return `lose`;
  }

  return `win`;
};

const resultTemplate = (game) => {
  return {
    timeup: {
      title: `Увы и ах!`,
      description: `Время вышло!<br>Вы не успели отгадать все мелодии`,
      comparison: `` // TODO убрать после исправления resultScreenTemplate
    },
    lose: {
      title: `Какая жалость!`,
      description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
      comparison: `` // TODO убрать после исправления resultScreenTemplate
    },
    win: {
      title: `Вы настоящий меломан!`,
      description: `За&nbsp;${game.time.minutes}&nbsp;${pluralize(game.time.minutes, `minutes`)} и ${game.time.seconds}&nbsp;${pluralize(game.time.seconds, `seconds`)}
      <br>вы&nbsp;набрали ${game.points} ${pluralize(game.points, `points`)} (${game.fastAnswers} ${pluralize(game.fastAnswers, `fast`)})
      <br>совершив ${game.mistakes}&nbsp;${pluralize(game.mistakes, `mistakes`)}`,
      comparison: `Вы заняли ${game.place} место из ${game.players}. Это&nbsp;лучше, чем у&nbsp;${game.rate}%&nbsp;игроков`
    }
  };
};

const getResult = (gameState) => {
  const userPoints = calculatePoints(gameState);
  const updatedStatistics = statistics.concat(userPoints).sort((a, b) => b - a);

  let gameResult = {
    time: msToMinutesAndSeconds(GAME_SETTINGS.totalTime - gameState.timeLeft),
    points: userPoints,
    fastAnswers: gameState.answers.filter((answer) => answer.correct && answer.time < GAME_SETTINGS.fastAnswerTime).length,
    mistakes: gameState.mistakes,
    players: updatedStatistics.length,
    place: updatedStatistics.indexOf(userPoints) + 1,
    get rate() {
      return Math.round(((this.players - this.place) / this.players) * 100);
    }
  };

  return resultTemplate(gameResult)[getOutput(gameState)];
};

export default getResult;
