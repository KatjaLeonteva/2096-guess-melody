import AbstractView from "./abstract-view";

export default class ConfirmView extends AbstractView {
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
