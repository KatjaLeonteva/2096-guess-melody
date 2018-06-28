import AbstractView from "./abstract-view";

export default class LogoView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
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
