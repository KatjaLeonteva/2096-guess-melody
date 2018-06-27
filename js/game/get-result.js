import {msToMinutesAndSeconds, pluralize} from "../util";
import {GAME_SETTINGS, GameStatus} from "../data/game-data";

const getResult = (state, output, points) => {
  let result;

  switch (output) {
    case GameStatus.TIMEUP:
      result = {
        title: `Увы и ах!`,
        description: `Время вышло!<br>Вы не успели отгадать все мелодии`
      };
      break;
    case GameStatus.LOSE:
      result = {
        title: `Какая жалость!`,
        description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
      };
      break;
    case GameStatus.WIN: {
      const time = msToMinutesAndSeconds(GAME_SETTINGS.totalTime - state.timeLeft);
      const fastAnswers = state.answers.filter((answer) => answer.correct && answer.time < GAME_SETTINGS.fastAnswerTime).length;

      result = {
        title: `Вы настоящий меломан!`,
        description: `За&nbsp;${time.minutes}&nbsp;${pluralize(time.minutes, `minutes`)} и ${time.seconds}&nbsp;${pluralize(time.seconds, `seconds`)}
        <br>вы&nbsp;набрали ${points} ${pluralize(points, `points`)} (${fastAnswers} ${pluralize(fastAnswers, `fast`)})
        <br>совершив ${state.mistakes}&nbsp;${pluralize(state.mistakes, `mistakes`)}`
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
