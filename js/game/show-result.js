import {msToMinutesAndSeconds, pluralize} from "../util";
import {GAME_SETTINGS} from "../data/game";
import {statistics} from "../data/game-data";
import {calculatePoints} from "./calculate-points";

export const showResult = (gameState) => {
  if (gameState.timeLeft === 0) {
    return {
      title: `Увы и ах!`,
      description: `Время вышло!<br>Вы не успели отгадать все мелодии`,
      comparison: `` // TODO убрать после исправления resultScreenTemplate
    };
  }

  if (gameState.mistakes === GAME_SETTINGS.maxMistakes) {
    return {
      title: `Какая жалость!`,
      description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
      comparison: `` // TODO убрать после исправления resultScreenTemplate
    };
  }

  const userPoints = calculatePoints(gameState);
  const gameTime = msToMinutesAndSeconds(GAME_SETTINGS.totalTime - gameState.timeLeft);
  const fastAnswersPoints = gameState.answers.filter((answer) => answer.time < GAME_SETTINGS.fastAnswerTime).length * GAME_SETTINGS.fastPoints;
  const updatedStatistics = statistics.concat(userPoints).sort((a, b) => b - a);
  const players = updatedStatistics.length;
  const place = updatedStatistics.indexOf(userPoints) + 1;
  const rate = Math.round(((players - place) / players) * 100);

  return {
    title: `Вы настоящий меломан!`,
    description: `За&nbsp;${gameTime.minutes}&nbsp;${pluralize(gameTime.minutes, `minutes`)} и ${gameTime.seconds}&nbsp;${pluralize(gameTime.seconds, `seconds`)}
      <br>вы&nbsp;набрали ${userPoints} ${pluralize(userPoints, `points`)} (${fastAnswersPoints} быстрых)
      <br>совершив ${gameState.mistakes}&nbsp;${pluralize(gameState.mistakes, `mistakes`)}`,
    comparison: `Вы заняли ${place} место из ${players}. Это&nbsp;лучше, чем у&nbsp;${rate}%&nbsp;игроков`
  };
};
