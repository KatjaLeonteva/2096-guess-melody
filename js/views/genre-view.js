var genreView = (function () {
  'use strict';

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

  return GenreView;

}());

//# sourceMappingURL=genre-view.js.map
