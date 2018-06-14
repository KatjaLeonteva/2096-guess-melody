export const initialState = {
  question: 0,
  timeLeft: 300000, // 5 min in ms
  mistakes: 0
};

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
    stat: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 12 баллов (8 быстрых)
      <br>совершив 3 ошибки`,
    comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`
  }
};
