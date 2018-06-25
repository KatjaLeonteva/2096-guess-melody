import AbstractView from "./abstract-view";

export default class PlayerView extends AbstractView {
  constructor(src, autoplay) {
    super();
    this.src = src;
    this.autoplay = autoplay;
  }

  get template() {
    return `<div class="player-wrapper">
    <div class="player">
      <audio src="${this.src}" ${this.autoplay ? `autoplay=true` : ``} loop></audio>
        <button class="player-control player-control--${this.autoplay ? `pause` : `play`}"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
  }

}
