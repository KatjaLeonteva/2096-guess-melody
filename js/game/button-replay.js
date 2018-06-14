import {changeScreen, render} from "../util";
import gameScreenArtist from "./game-screen-artist";

const buttonReplay = render(`<span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`);
buttonReplay.addEventListener(`click`, () => changeScreen(gameScreenArtist()));

export default buttonReplay;
