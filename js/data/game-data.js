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
    trackSrc: data[0].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[0], correct: true},
      'val-2': {track: data[1], correct: false},
      'val-3': {track: data[2], correct: false}
    }
  },
  {
    type: `guessArtist`,
    trackSrc: data[1].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[1], correct: true},
      'val-2': {track: data[3], correct: false},
      'val-3': {track: data[4], correct: false}
    }
  },
  {
    type: `guessArtist`,
    trackSrc: data[2].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[2], correct: true},
      'val-2': {track: data[5], correct: false},
      'val-3': {track: data[1], correct: false}
    }
  },
  {
    type: `guessArtist`,
    trackSrc: data[3].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[3], correct: true},
      'val-2': {track: data[4], correct: false},
      'val-3': {track: data[5], correct: false}
    }
  },
  {
    type: `guessArtist`,
    trackSrc: data[4].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[4], correct: true},
      'val-2': {track: data[2], correct: false},
      'val-3': {track: data[3], correct: false}
    }
  },
  {
    type: `guessArtist`,
    trackSrc: data[5].src,
    title: `Кто исполняет эту песню?`,
    answers: {
      'val-1': {track: data[5], correct: true},
      'val-2': {track: data[3], correct: false},
      'val-3': {track: data[4], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    title: `Выберите R&B треки`,
    answers: {
      'answer-1': {track: data[3], correct: true},
      'answer-2': {track: data[0], correct: false},
      'answer-3': {track: data[1], correct: false},
      'answer-4': {track: data[2], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    title: `Выберите Country треки`,
    answers: {
      'answer-1': {track: data[2], correct: true},
      'answer-2': {track: data[3], correct: false},
      'answer-3': {track: data[4], correct: false},
      'answer-4': {track: data[5], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    title: `Выберите Jazz треки`,
    answers: {
      'answer-1': {track: data[0], correct: true},
      'answer-2': {track: data[2], correct: false},
      'answer-3': {track: data[3], correct: false},
      'answer-4': {track: data[4], correct: false}
    }
  },
  {
    type: `chooseGenre`,
    title: `Выберите Pop треки`,
    answers: {
      'answer-1': {track: data[4], correct: true},
      'answer-2': {track: data[0], correct: false},
      'answer-3': {track: data[1], correct: false},
      'answer-4': {track: data[2], correct: false}
    }
  }
];

export const statistics = [6, 4, 12, 8];
