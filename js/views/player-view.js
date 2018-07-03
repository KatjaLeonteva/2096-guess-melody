import AbstractView from "./abstract-view";

export default class PlayerView extends AbstractView {
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
    this.element.querySelector(`audio`).play();
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
