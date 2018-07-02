import AbstractView from "./abstract-view";

const MODAL_TIMEOUT = 5000; // 5 sec

export default class ErrorView extends AbstractView {
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
