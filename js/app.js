import GameModel from "./data/game-model";
import WelcomeScreen from "./screens/welcome-screen";
import GameScreen from "./screens/game-screen";
import ResultScreen from "./screens/result-screen";
import changeScreen from "./game/change-screen";
import ErrorView from "./views/error-view";

const app = document.querySelector(`div.app`);

export default class Application {

  static showWelcome() {
    const welcomeScreen = new WelcomeScreen();
    changeScreen(welcomeScreen.element);
  }

  static showGame(data) {
    const model = new GameModel(data);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
  }

  static showResult(model) {
    const resultScreen = new ResultScreen(model);
    changeScreen(resultScreen.element);
  }

  static showError(error) {
    const modal = new ErrorView(error.message);
    app.appendChild(modal.element);
  }

}
