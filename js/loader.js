import adaptServerData from "./data/data-adapter";
import Application from "./app";

const SERVER_URL = `https://es.dump.academy/guess-melody`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`Данные не загрузились. Ошибка: ${response.status} ${response.statusText}`);
  }
};

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => adaptServerData(data))
      // TODO загрузить все картинки и аудио
      .catch(Application.showError);
  }
}
