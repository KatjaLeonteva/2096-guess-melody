import render from '../render';
import timer from './timer-element';
import changeScreen from '../game/change-screen';
import welcomeScreen from '../screens/welcome-screen';

const gameHeader = (state) => {
  const gameHeaderTemplate = `
  <div>
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    ${timer(state.timeLeft)}
    <div class="main-mistakes">
      ${Array(state.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>
  </div>
  `;

  const gameHeaderElement = render(gameHeaderTemplate);

  // 3.6. В левом верхнем углу экрана появляется ссылка на приветственный экран.
  // Нажатие на эту ссылку возвращает пользователя на этот экран.
  // При нажатии на эту ссылку, пользователю сначала показывается диалоговое окно
  // с предупреждением, что вся его игра будет потеряна.
  const playAgainButton = gameHeaderElement.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    // TODO Добавить модальное окно
    changeScreen(welcomeScreen);
  });

  return gameHeaderElement;
};

export default gameHeader;
