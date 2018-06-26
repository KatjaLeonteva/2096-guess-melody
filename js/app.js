import GameModel from "./data/game-model";
import WelcomeScreen from "./screens/welcome-screen";
import GameScreen from "./screens/game-screen";
import ResultScreen from "./screens/result-screen";
import changeScreen from "./game/change-screen";
import ErrorView from "./views/error-view";

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

    // Сообщение удаляется по клику
    modal.element.addEventListener(`click`, function (evt) {
      evt.currentTarget.remove();
    });

    // Сообщение удаляется через 5 секунд
    setTimeout(function () {
      modal.element.remove();
    }, 5000);

    document.querySelector(`div.app`).appendChild(modal.element);
  }

}
