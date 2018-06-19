import render from '../render';
import startGame from '../game/start-game';

const buttonReplay = render(`<span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`);
// 4.2. При нажатии на кнопку Попробовать ещё раз пользователь попадает на первый вопрос
// с тем же набором вопросов, что и в прошлый раз.
buttonReplay.addEventListener(`click`, () => startGame());

export default buttonReplay;
