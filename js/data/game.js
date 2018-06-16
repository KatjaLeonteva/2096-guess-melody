export const GAME_SETTINGS = {
  totalQuestions: 10,
  totalTime: 300000, // 5 min in ms
  fastAnswerTime: 30000, // 30 sec
  maxMistakes: 3,
  losePoints: -1,
  statistics: [6, 4, 12, 8]
};

export const INITIAL_STATE = Object.freeze({
  level: 0,
  timeLeft: GAME_SETTINGS.totalTime,
  mistakes: 0,
  answers: []
});

export const results = {
  timeup: {
    title: `Увы и ах!`,
    description: `Время вышло!<br>Вы не успели отгадать все мелодии`
  },
  lose: {
    title: `Какая жалость!`,
    description: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`
  },
  win: {
    title: `Вы настоящий меломан!`,
    description: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 12 баллов (8 быстрых)
      <br>совершив 3 ошибки`,
    comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`
  }
};
