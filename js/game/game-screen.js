import {changeScreen, render} from '../util';
import {initialState} from "../data/game-data";
import gameHeader from "./game-header";

const gameScreen = (question) => {
  const artistTemplate = `
    <section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${question.track}"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
        Ответы
        </form>
      </div>
    </section>
  `;

  const genreTemplate = `
    <section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">${question.title}</h2>
        <form class="genre">
          Ответы
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>
  `;

  const questionTemplateMap = {
    guessArtist: artistTemplate,
    chooseGenre: genreTemplate
  };

  const gameScreenElement = render(questionTemplateMap[question.type]);
  gameScreenElement.insertAdjacentElement(`afterbegin`, gameHeader(initialState));

  return gameScreenElement;
};

export default gameScreen;
