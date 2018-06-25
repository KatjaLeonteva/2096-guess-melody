import AbstractView from "./abstract-view";

export default class PlayerView extends AbstractView {
  constructor(src) {
    super();
    this.src = src;
  }

  get template() {
    return `<div class="player-wrapper">
    <div class="player">
      <audio src="${this.src}"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
  }

}
