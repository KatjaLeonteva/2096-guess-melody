import {msToMinutesAndSeconds, pluralize} from "../util";
import {GAME_SETTINGS, statistics} from "../data/game-data";
import calculatePoints from "./calculate-points";

const getResult = (state, output) => {
  const points = calculatePoints(state, output);
  const updatedStatistics = statistics.concat(points).sort((a, b) => b - a);

  let result;

  switch (output) {
    case `timeup`:
      result = {
        title: `Увы и ах!`,
        description: `Время вышло!<br>Вы не успели отгадать все мелодии`
      };
      break;
    case `lose`:
      result = {
        title: `Какая жалость!`,
        description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
      };
      break;
    case `win`: {
      const time = msToMinutesAndSeconds(GAME_SETTINGS.totalTime - state.timeLeft);
      const fastAnswers = state.answers.filter((answer) => answer.correct && answer.time < GAME_SETTINGS.fastAnswerTime).length;
      const place = updatedStatistics.indexOf(points) + 1;
      const players = updatedStatistics.length;
      const rate = Math.round(((players - place) / players) * 100);

      result = {
        title: `Вы настоящий меломан!`,
        description: `За&nbsp;${time.minutes}&nbsp;${pluralize(time.minutes, `minutes`)} и ${time.seconds}&nbsp;${pluralize(time.seconds, `seconds`)}
        <br>вы&nbsp;набрали ${points} ${pluralize(points, `points`)} (${fastAnswers} ${pluralize(fastAnswers, `fast`)})
        <br>совершив ${state.mistakes}&nbsp;${pluralize(state.mistakes, `mistakes`)}`,
        comparison: `Вы заняли ${place} место из ${players}. Это&nbsp;лучше, чем у&nbsp;${rate}%&nbsp;игроков`
      };
      break;
    }
    default: {
      throw new Error(`Unknown result: ${output}`);
    }
  }

  return result;
};

export default getResult;
