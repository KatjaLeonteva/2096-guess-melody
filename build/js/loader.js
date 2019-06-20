var loader = (function () {
  'use strict';

  const QuestionType = {
    artist: `guessArtist`,
    genre: `chooseGenre`
  };

  const preProcessType = (type) => {
    return QuestionType[type];
  };

  const preProcessArtistAnswers = (answers) => {
    let newAnswers = {};

    answers.forEach((answer, index) => {
      newAnswers[`val-${index}`] = {
        track: {
          artist: answer.title,
          image: answer.image.url
        },
        correct: answer.isCorrect
      };
    });

    return newAnswers;
  };

  const preProcessGenreAnswers = (answers, genre) => {
    let newAnswers = {};

    answers.forEach((answer, index) => {
      newAnswers[`val-${index}`] = {
        track: {
          src: answer.src
        },
        correct: answer.genre === genre
      };
    });

    return newAnswers;
  };

  const adaptServerData = (data) => {

    for (const question of data) {
      question.type = preProcessType(question.type);

      question.title = question.question;

      if (question.type === QuestionType.artist) {
        question.answers = preProcessArtistAnswers(question.answers);
      } else if (question.type === QuestionType.genre) {
        question.answers = preProcessGenreAnswers(question.answers, question.genre);
      }
    }

    return data;
  };

  const GAME_SETTINGS = {
    totalQuestions: 10,
    totalTime: 300000, // 5 min in ms
    fastAnswerTime: 30000, // 30 sec in ms
    maxMistakes: 2,
    losePoints: -1,
    regularPoints: 1,
    fastPoints: 2,
    wrongPoints: -2
  };

  const GameStatus = {
    TIMEUP: `timeup`,
    LOSE: `lose`,
    WIN: `win`,
    CONTINUE: `continue`
  };

  const INITIAL_STATE = Object.freeze({
    level: 0,
    timeLeft: GAME_SETTINGS.totalTime,
    mistakes: 0,
    answers: []
  });

  /**
   * Проверяет ответы пользователя
   * @param {Object} question Вопрос
   * @param {Array} answers Ответы пользователя
   * @return {Boolean} Возвращает true, если выбраны только верные ответы
   */

  const checkAnswers = (question, answers) => {
    const correctAnswers = [...Object.entries(question.answers)].reduce((arr, [answerValue, answerData]) => {
      if (answerData.correct) {
        arr.push(answerValue);
      }
      return arr;
    }, []);

    if (correctAnswers.length === answers.length) {
      return correctAnswers.every((elem) => answers.includes(elem));
    } else {
      return false;
    }
  };

  class GameModel {
    constructor(data) {
      this.data = data;
      // Чтобы включить режим отладки, нужно добавить в url параметр ?debug=true
      // Правильные ответы будут обозначены красным.
      this.debug = new URLSearchParams(location.search).get(`debug`) || false;
      this.restart();
    }

    get questions() {
      return this.data.questions;
    }

    get audiosMap() {
      return this.data.audiosMap;
    }

    get level() {
      return this.state.level;
    }

    get timeLeft() {
      return this.state.timeLeft;
    }

    get mistakes() {
      return this.state.mistakes;
    }

    get currentQuestion() {
      return this.questions[this.level];
    }

    get status() {
      if (this.state.timeLeft === 0) {
        return GameStatus.TIMEUP;
      }

      if (this.state.mistakes > GAME_SETTINGS.maxMistakes) {
        return GameStatus.LOSE;
      }

      if (this.state.answers.length === GAME_SETTINGS.totalQuestions) {
        return GameStatus.WIN;
      }

      return GameStatus.CONTINUE;
    }

    restart() {
      this.state = Object.assign({}, INITIAL_STATE);
      this.state.answers = []; // Удаляем ответы, оставшиеся с предыдущей игры
    }

    levelUp() {
      this.state.level++;
    }

    saveAnswer(answer) {
      const correct = checkAnswers(this.currentQuestion, answer);

      if (!correct) {
        this.state.mistakes++;
      }

      const time = GAME_SETTINGS.totalTime - this.timeLeft - this._calculateAnswersTime();
      this.state.answers.push({time, correct});
    }

    tick(interval) {
      if (this.timeLeft > 0) {
        this.state.timeLeft -= interval;
        return true;
      }
      return false;
    }

    _calculateAnswersTime() {
      return this.state.answers.reduce((sum, answer) => {
        sum += answer.time;
        return sum;
      }, 0);
    }

  }

  /**
   * Создает DOM-элемент по шаблону.
   * @param {string} markup Разметка элемента.
   * @return {Node} Новый элемент.
   */
  const render = (markup = ``) => {
    const template = document.createElement(`template`);
    template.innerHTML = markup.trim();
    return template.content.firstChild;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render(this.template);
    }

    bind() {
      // bind handlers if required
    }

  }

  // Варианты склонения для 1 шт, 2-4 шт, 0 и 5-20 шт
  const cases = {
    minutes: [`минуту`, `минуты`, `минут`],
    seconds: [`секунду`, `секунды`, `секунд`],
    points: [`балл`, `балла`, `баллов`],
    mistakes: [`ошибку`, `ошибки`, `ошибок`],
    attempts: [`раз`, `раза`, `раз`],
    fast: [`быстрый`, `быстрых`, `быстрых`]
  };

  const TimeInMs = {
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
  };

  /**
   * Переводит миллисекунды в минуты и секунды
   * @param {number} ms Миллисекунды.
   * @return {object} Время в минутах и секундах
   */
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / TimeInMs.ONE_MINUTE);
    const seconds = ((ms % TimeInMs.ONE_MINUTE) / TimeInMs.ONE_SECOND).toFixed(0);
    return {minutes, seconds};
  };

  /**
   * Возвращает существительное в правильном склонении
   * в зависимости от стоящего перед ним числа
   * @param {number} number Число
   * @param {string} noun Существительное
   * @return {string} Существительное в правильном склонении
   */
  const pluralize = (number, noun) => {
    const nouns = cases[noun];

    let n = Math.abs(number);

    // Ends in 1, excluding 11
    if (n % 10 === 1 && n % 100 !== 11) {
      return nouns[0];
    }
    // Ends in 2-4, excluding 12-14
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return nouns[1];
    }

    // Everything else
    return nouns[2];
  };

  const LoaderText = {
    PROGRESS: `Игра загружается...`,
    FAIL: `Загрузить еще раз`
  };

  class WelcomeView extends AbstractView {
    constructor(settings, callback) {
      super();
      this.settings = settings;
      this.callback = callback;
    }

    get template() {
      const totalTimeMin = msToMinutesAndSeconds(this.settings.totalTime).minutes;
      const maxMistakes = this.settings.maxMistakes;

      return `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <p class="text loader">${LoaderText.PROGRESS}</p>
      <button class="main-play main-play--hidden">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;${totalTimeMin} ${pluralize(totalTimeMin, `minutes`)} ответить на все вопросы.<br>
        Ошибиться можно ${maxMistakes} ${pluralize(maxMistakes, `attempts`)}.<br>
        Удачи!
      </p>
    </section>`;
    }

    onPlayButtonClick() {}

    onLoadSuccess() {
      this.element.querySelector(`.main-play`).classList.remove(`main-play--hidden`);
      this.element.querySelector(`.loader`).remove();
    }

    onLoadFail() {
      const loader = this.element.querySelector(`.loader`);

      const onLoaderClick = () => {
        loader.textContent = LoaderText.PROGRESS;
        loader.classList.remove(`loader--failed`);
        this.callback();
        loader.removeEventListener(`click`, onLoaderClick);
      };

      // Если данные не загрузились, попробовать еще раз
      loader.textContent = LoaderText.FAIL;
      loader.classList.add(`loader--failed`);
      loader.addEventListener(`click`, onLoaderClick);
    }

    bind() {
      const playButton = this.element.querySelector(`.main-play`);
      playButton.addEventListener(`click`, () => this.onPlayButtonClick());
    }
  }

  /** @module Приветствие */

  class WelcomeScreen {
    constructor() {
      this.loadQuestions = () => {
        Loader.loadData()
        .then((data) => {
          if (data) {
            this.data = data;
            this.screen.onLoadSuccess();
          } else {
            this.screen.onLoadFail();
          }
        });
      };

      this.screen = new WelcomeView(GAME_SETTINGS, this.loadQuestions);

      this.bind();
      this.init();
    }

    get element() {
      return this.screen.element;
    }

    init() {
      this.loadQuestions();
    }

    bind() {
      this.screen.onPlayButtonClick = () => Application.showGame(this.data);
    }

  }

  /**
   * Переключает текущий экран.
   * @param {Node} screen Экран, который нужно отобразить.
   */
  const changeScreen = (screen) => {
    const currentScreen = document.querySelector(`section.main`);
    document.querySelector(`div.app`).replaceChild(screen, currentScreen);
  };

  class LogoView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>`;
    }

    onLogoClick() {}

    bind() {
      this.element.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onLogoClick();
      });
    }

  }

  const getRadius = (timeRatio, radius) => {
    const stroke = (2 * Math.PI * radius).toFixed(); // Circumference of a circle is 2 * Pi * r
    const offset = ((1 - timeRatio) * stroke).toFixed();

    return {stroke, offset};
  };

  const RADIUS = 370;
  const ALARM = 30000; // Когда осталось менее 30 секунд таймер должен начать мигать красным цветом

  class TimerView extends AbstractView {
    constructor(timeLeft, totalTime) {
      super();
      this.timeLeft = timeLeft;
      this.totalTime = totalTime;
    }

    get template() {
      const timerRadius = getRadius(this.timeLeft / this.totalTime, RADIUS);
      const timeLeftInMinSec = msToMinutesAndSeconds(this.timeLeft);

      return `<div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          stroke-dasharray="${timerRadius.stroke}"
          stroke-dashoffset="${timerRadius.offset}"
          style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div class="timer-value ${this.timeLeft < ALARM ? `timer-value--finished` : ``}" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${timeLeftInMinSec.minutes.toString().padStart(2, `0`)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${timeLeftInMinSec.seconds.toString().padStart(2, `0`)}</span>
      </div>
    </div>`;
    }

  }

  class TimerView$1 extends AbstractView {
    constructor(mistakes) {
      super();
      this.mistakes = mistakes;
    }

    get template() {
      return `
    <div class="main-mistakes">
      ${Array(this.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>`;
    }

  }

  class PlayerView extends AbstractView {
    constructor(audio, autoplay) {
      super();
      this.audio = audio;
      this.autoplay = autoplay;

      this.audio.autoplay = this.autoplay;
      const player = this.element.querySelector(`.player`);
      player.insertBefore(this.audio, player.firstElementChild);
    }

    get template() {
      return `<div class="player-wrapper">
    <div class="player">
      <button class="player-control player-control--${this.autoplay ? `pause` : `play`}"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
    }

    onPlayClicked() {}

    bind() {
      const player = this.element.querySelector(`.player`);
      player.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.isPlaying()) {
          this.pauseTrack();
        } else {
          this.playTrack();
        }
      });
    }

    pauseTrack() {
      this.element.querySelector(`audio`).pause();
      this.element.querySelector(`.player-control`).classList.replace(`player-control--pause`, `player-control--play`);
    }

    playTrack() {
      this.onPlayClicked();
      this.element.querySelector(`audio`).play().catch((error) => {
        throw new Error(error); // An error ocurred or the user agent prevented playback.
      });
      this.element.querySelector(`.player-control`).classList.replace(`player-control--play`, `player-control--pause`);
    }

    stopTrack() {
      this.pauseTrack();
      this.element.querySelector(`audio`).currentTime = 0;
    }

    isPlaying() {
      const audio = this.element.querySelector(`audio`);
      return audio.duration > 0 && !audio.paused;
    }

  }

  class ArtistView extends AbstractView {
    constructor(model) {
      super();
      this.model = model;
      this.question = this.model.currentQuestion;
      this.player = new PlayerView(this.model.audiosMap.get(this.question.src), true);

      const placeholder = this.element.querySelector(`.player`);
      placeholder.parentElement.replaceChild(this.player.element, placeholder);
    }

    get template() {
      return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <h2 class="title main-title">${this.question.title}</h2>
      <div class="player"></div>
      <form class="main-list">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="${answerValue}"/>
          <label class="main-answer" for="answer-${index + 1}">
            <img class="main-answer-preview ${this.model.debug && answerData.correct ? `main-answer-preview--correct` : ``}" src="${answerData.track.image}"
                 alt="${answerData.track.artist}" width="134" height="134">
            ${answerData.track.artist}
          </label>
        </div>`).join(``)}
      </form>
    </div>
  </section>`;
    }

    onAnswerSend() {}

    bind() {
      // Обработчик для формы
      const artistForm = this.element.querySelector(`form.main-list`);
      const artistAnswers = Array.from(artistForm.querySelectorAll(`input[name="answer"]`));

      artistAnswers.forEach((answer) => {
        answer.addEventListener(`change`, (evt) => {
          evt.preventDefault();
          const checkedAnswers = artistAnswers.filter((input) => input.checked).map((input) => input.value);
          this.onAnswerSend(checkedAnswers);
        });
      });
    }

    pauseAllTracks() {
      if (this.player.isPlaying()) {
        this.player.pauseTrack();
      }
    }

    stopAllTracks() {
      this.player.stopTrack();
    }

  }

  class GenreView extends AbstractView {
    constructor(model) {
      super();
      this.model = model;
      this.question = this.model.currentQuestion;
      this.players = [];

      const placeholders = this.element.querySelectorAll(`.player`);
      placeholders.forEach((placeholder, index) => {
        const player = new PlayerView(this.model.audiosMap.get(this.question.answers[placeholder.id].track.src), index === 0);
        player.onPlayClicked = () => this.pauseAllTracks();
        this.players.push(player);
        placeholder.parentElement.replaceChild(player.element, placeholder);
      });
    }

    get template() {
      return `<section class="main main--level main--level-genre">
    <div class="main-wrap">
      <h2 class="title">${this.question.title}</h2>
      <form class="genre">
        ${[...Object.entries(this.question.answers)].map(([answerValue, answerData], index) => `
        <div class="genre-answer">
          <div class="player" id="${answerValue}"></div>
          <input type="checkbox" name="answer" value="${answerValue}" id="a-${index + 1}">
          <label class="genre-answer-check ${this.model.debug && answerData.correct ? `genre-answer-check--correct` : ``}" for="a-${index + 1}"></label>
        </div>`).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;
    }

    onAnswerSend() {}

    bind() {
      // Обработчик для формы
      const genreForm = this.element.querySelector(`form.genre`);
      const genreAnswers = Array.from(genreForm.querySelectorAll(`input[name="answer"]`));
      const sendAnswerButton = genreForm.querySelector(`.genre-answer-send`);

      const onAnswerChange = () => {
        const someAnswersChecked = genreAnswers.some((el) => el.checked === true);
        sendAnswerButton.disabled = !someAnswersChecked;
      };

      sendAnswerButton.disabled = true; // Кнопка «Ответить» отключена, пока не выбран ни один из вариантов ответа.

      genreAnswers.forEach((answer) => {
        answer.addEventListener(`change`, onAnswerChange);
      });

      sendAnswerButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const checkedAnswers = genreAnswers.filter((input) => input.checked).map((input) => input.value);
        this.onAnswerSend(checkedAnswers);
      });
    }

    pauseAllTracks() {
      this.players.map((it) => it.pauseTrack());
    }

    stopAllTracks() {
      this.players.map((it) => it.stopTrack());
    }

  }

  class ConfirmView extends AbstractView {
    constructor(text = `Вы уверены?`) {
      super();
      this.text = text;
    }

    get template() {
      return `<section class="modal-confirm modal-confirm__wrap">
      <form class="modal-confirm__inner">
        <button class="modal-confirm__close" type="button">Закрыть</button>
        <h2 class="modal-confirm__title">Подтверждение</h2>
        <p class="modal-confirm__text">${this.text}</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn">Ок</button>
          <button class="modal-confirm__btn">Отмена</button>
        </div>
      </form>
    </section>`;
    }

    onConfirm() {}

    onCancel() {}

    bind() {
      const closeButton = this.element.querySelector(`.modal-confirm__close`);
      const confirmButton = this.element.querySelectorAll(`.modal-confirm__btn`)[0];
      const cancelButton = this.element.querySelectorAll(`.modal-confirm__btn`)[1];

      const cancelHandler = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        this.onCancel();
      };

      cancelButton.addEventListener(`click`, cancelHandler);
      closeButton.addEventListener(`click`, cancelHandler);

      confirmButton.addEventListener(`click`, (evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        this.onConfirm();
      });
    }

  }

  const GameView = {
    guessArtist: ArtistView,
    chooseGenre: GenreView
  };

  class GameScreen {
    constructor(model) {
      this.model = model;
      this.screen = new GameView[this.model.currentQuestion.type](this.model);
      this.logo = new LogoView();
      this.timer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
      this.mistakes = new TimerView$1(this.model.mistakes);
      this.modal = new ConfirmView(`Вы уверены что хотите начать игру заново?`);

      this._interval = null;

      this.bind();
      this.init();
      this.startTimer();
    }

    get element() {
      return this.screen.element;
    }

    init() {
      const wrapper = this.element.querySelector(`.main-wrap`);
      this.screen.element.insertBefore(this.logo.element, wrapper);
      this.screen.element.insertBefore(this.timer.element, wrapper);
      this.screen.element.insertBefore(this.mistakes.element, wrapper);
    }

    bind() {
      this.logo.onLogoClick = () => this.confirmRestart();

      this.screen.onAnswerSend = (userAnswers) => {
        this.stopTimer();
        this.screen.stopAllTracks(); // Баг в Safari: песни продолжают проигрываться при переходе на новый экран
        this.model.saveAnswer(userAnswers);

        if (this.model.status === GameStatus.CONTINUE) {
          this.model.levelUp();
          changeScreen(new GameScreen(this.model).element);
        } else {
          Application.showResult(this.model);
        }
      };

      this.modal.onConfirm = () => Application.showWelcome();
      this.modal.onCancel = () => {
        this.startTimer();
        this.screen.element.removeChild(this.modal.element);
      };
    }

    stopTimer() {
      clearInterval(this._interval);
    }

    startTimer() {
      this._interval = setInterval(() => {
        const tick = this.model.tick(TimeInMs.ONE_SECOND);
        if (tick) {
          this.updateTimer();
        } else {
          this.stopTimer();
          Application.showResult(this.model);
        }
      }, TimeInMs.ONE_SECOND);
    }

    updateTimer() {
      const newTimer = new TimerView(this.model.timeLeft, GAME_SETTINGS.totalTime);
      this.screen.element.replaceChild(newTimer.element, this.timer.element);
      this.timer = newTimer;
    }

    confirmRestart() {
      this.stopTimer();
      this.screen.pauseAllTracks();
      this.screen.element.appendChild(this.modal.element);
    }

  }

  class ResultView extends AbstractView {
    constructor(result) {
      super();
      this.result = result;
    }

    get template() {
      return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
    <h2 class="title">${this.result.title}</h2>
    <div class="main-stat">${this.result.description}</div>
  </section>`;
    }

    onStatsLoad(comparison) {
      this.element.insertAdjacentHTML(`beforeend`, `<span class="main-comparison">${comparison}</span>`);
    }

  }

  class ReplayView extends AbstractView {
    constructor(title) {
      super();
      this.title = title;
    }

    get template() {
      return `<span role="button" tabindex="0" class="main-replay">${this.title}</span>`;
    }

    onReplayButtonClick() {}

    bind() {
      this.element.addEventListener(`click`, () => this.onReplayButtonClick());
    }

  }

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

  const getComparison = (points, statistics) => {
    statistics.sort((a, b) => b - a);
    const playersCount = statistics.length;

    if (playersCount === 1) {
      return `Вы первый, кто сыграл в эту игру!`;
    }

    const place = statistics.indexOf(points) + 1;
    const rate = Math.round(((playersCount - place) / playersCount) * 100);
    return `Вы заняли ${place} место из ${playersCount}. Это лучше, чем у ${rate}% игроков`;
  };

  const calculatePoints = (gameState, gameOutput) => {
    if (gameOutput === GameStatus.TIMEUP || gameOutput === GameStatus.LOSE) {
      return GAME_SETTINGS.losePoints;
    }

    return gameState.answers.reduce((points, answer) => {
      if (answer.correct) {
        points += (answer.time < GAME_SETTINGS.fastAnswerTime) ? GAME_SETTINGS.fastPoints : GAME_SETTINGS.regularPoints;
      } else {
        points += GAME_SETTINGS.wrongPoints;
      }
      return points;
    }, 0);
  };

  class ResultScreen {
    constructor(model) {
      this.model = model;
      this.points = calculatePoints(this.model.state, this.model.status);
      this.screen = new ResultView(getResult(this.model.state, this.model.status, this.points));
      this.replay = new ReplayView((this.model.status === GameStatus.WIN ? `Сыграть` : `Попробовать`) + ` ещё раз`);

      this._saveAndCompare();
      this.bind();
      this.init();
    }

    get element() {
      return this.screen.element;
    }

    init() {
      this.screen.element.appendChild(this.replay.element);
    }

    bind() {
      this.replay.onReplayButtonClick = () => Application.showGame(this.model.data);
    }

    _saveAndCompare() {
      // Если выигрыш, сохраняем результат и загружаем статистику
      // и показываем сравнение с другими игроками
      if (this.model.status === GameStatus.WIN) {
        Loader.saveData({date: Date.now(), points: this.points})
          .then(Loader.loadStatistics)
          .then((data) => {
            if (data) {
              this.stats = data;
              this.screen.onStatsLoad(getComparison(this.points, this.stats));
            }
          });
      }
    }

  }

  const MODAL_TIMEOUT = 5000; // 5 sec

  class ErrorView extends AbstractView {
    constructor(text = ``) {
      super();
      this.text = text;
    }

    get template() {
      return `<section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">${this.text}</p>
      </div>
    </section>`;
    }

    bind() {
      const onModalClick = () => {
        this.element.removeEventListener(`click`, onModalClick);
        this.element.remove();
      };

      // Сообщение удаляется по клику
      this.element.addEventListener(`click`, onModalClick);

      // Сообщение удаляется через 5 секунд
      setTimeout(onModalClick, MODAL_TIMEOUT);
    }

  }

  const app = document.querySelector(`div.app`);

  class Application {

    static showWelcome() {
      const welcomeScreen = new WelcomeScreen();
      changeScreen(welcomeScreen.element);
    }

    static showGame(data) {
      const model = new GameModel(data);
      const gameScreen = new GameScreen(model);
      changeScreen(gameScreen.element);
    }

    static showResult(model) {
      const resultScreen = new ResultScreen(model);
      changeScreen(resultScreen.element);
    }

    static showError(error) {
      const modal = new ErrorView(error.message);
      app.appendChild(modal.element);
    }

  }

  const SERVER_URL = `https://es.dump.academy/guess-melody`;
  const APP_ID = 2096;
  const StatusCodes = {
    OK_MIN: 200,
    OK_MAX: 300
  };

  const checkStatus = (response, errorText) => {
    if (response.status >= StatusCodes.OK_MIN && response.status < StatusCodes.OK_MAX) {
      return response;
    }

    throw new Error(`${errorText} Ошибка: ${response.status} ${response.statusText}`);
  };

  const toJSON = (response) => response.json();

  const loadAudio = (src) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = `none`;
      audio.load();
      audio.oncanplaythrough = () => resolve([audio.src, audio]);
      audio.onerror = () => reject(new Error(`Не удалось загрузить аудиофайл.`));
    });
  };

  const loadAllAudio = (questions) => {
    // Создаем список треков. Ссылки не должны повторяться,
    // чтобы не загружать одну и ту же песню несколько раз

    const audiosSrc = questions.reduce((set, question) => {
      if (question.src) {
        set.add(question.src);
      } else {
        const answers = question.answers;
        for (const i in answers) {
          if (answers.hasOwnProperty(i)) {
            set.add(answers[i].track.src);
          }
        }
      }
      return set;
    }, new Set());

    // Когда все треки загрузятся, возвращаем первоначальный список вопросов
    // и мапку, из которой будем брать элементы аудио по src
    return Promise.all([...audiosSrc].map((src) => loadAudio(src)))
      .then((audios) => {
        return {questions, audiosMap: new Map(audios)};
      });
  };

  class Loader {

    static loadData() {
      return fetch(`${SERVER_URL}/questions`)
        .then((response) => checkStatus(response, `Не удалось загрузить вопросы.`))
        .then(toJSON)
        .then((data) => adaptServerData(data))
        .then((questions) => loadAllAudio(questions))
        .catch(Application.showError);
    }

    // Этот метод вызывается после сохранения результата игрока,
    // поэтому ответ никогда не должен быть пустым и 404 это ошибка
    static loadStatistics() {
      return fetch(`${SERVER_URL}/stats/${APP_ID}`)
        .then((response) => checkStatus(response, `Не удалось загрузить статистику.`))
        .then(toJSON)
        .then((statistics) => statistics.map((it) => it.points))
        .catch(Application.showError);
    }

    static saveData(data) {
      data = Object.assign({}, data);
      const requestSettings = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };
      return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings)
        .then((response) => checkStatus(response, `Не удалось сохранить результат.`))
        .catch(Application.showError);
    }

  }

  return Loader;

}());

//# sourceMappingURL=loader.js.map
