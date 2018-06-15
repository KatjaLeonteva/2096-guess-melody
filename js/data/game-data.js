export const gameSettings = {
  questions: 10,
  totalTime: 300000, // 5 min in ms
  fastAnswerTime: 30000, // 30 sec
  maxMistakes: 3,
  losePoints: -1,
  statistics: [6, 4, 12, 8]
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

// Music from https://www.youtube.com/audiolibrary/music?feature=blog
const data = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export const gameQuestions = [
  {
    type: `guessArtist`,
    track: data[0].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[0], correct: true},
      'answer-2': {track: data[1], correct: false},
      'answer-3': {track: data[2], correct: false}
    }
  },
  {
    type: `guessArtist`,
    track: data[1].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[1], correct: true},
      'answer-2': {track: data[3], correct: false},
      'answer-3': {track: data[4], correct: false}
    }
  },
  {
    type: `guessArtist`,
    track: data[2].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[2], correct: true},
      'answer-2': {track: data[5], correct: false},
      'answer-3': {track: data[1], correct: false}
    }
  },
  {
    type: `guessArtist`,
    track: data[3].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[3], correct: true},
      'answer-2': {track: data[4], correct: false},
      'answer-3': {track: data[5], correct: false}
    }
  },
  {
    type: `guessArtist`,
    track: data[4].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[4], correct: true},
      'answer-2': {track: data[2], correct: false},
      'answer-3': {track: data[3], correct: false}
    }
  },
  {
    type: `guessArtist`,
    track: data[5].src,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {track: data[5], correct: true},
      'answer-2': {track: data[3], correct: false},
      'answer-3': {track: data[4], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    question: `Выберите R&B треки`,
    answers: {
      'answer-1': {track: data[3], correct: true},
      'answer-2': {track: data[0], correct: false},
      'answer-3': {track: data[1], correct: false},
      'answer-4': {track: data[2], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    question: `Выберите Country треки`,
    answers: {
      'answer-1': {track: data[2], correct: true},
      'answer-2': {track: data[3], correct: false},
      'answer-3': {track: data[4], correct: false},
      'answer-4': {track: data[5], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    question: `Выберите Jazz треки`,
    answers: {
      'answer-1': {track: data[0], correct: true},
      'answer-2': {track: data[2], correct: false},
      'answer-3': {track: data[3], correct: false},
      'answer-4': {track: data[4], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    question: `Выберите Pop треки`,
    answers: {
      'answer-1': {track: data[4], correct: true},
      'answer-2': {track: data[0], correct: false},
      'answer-3': {track: data[1], correct: false},
      'answer-4': {track: data[2], correct: false}
    }
  }
];

export let userResults = [];
