import adaptServerData from "./data/data-adapter";
import Application from "./app";

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 2096;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`Данные не загрузились. Ошибка: ${response.status} ${response.statusText}`);
};

const toJSON = (response) => response.json();

const loadAudio = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = url;
    audio.onloadeddata = () => resolve();
    audio.onerror = () => reject(new Error(`Не удалось загрузить аудиофайл`));
  });
};

const loadAllAudio = (questions) => {
  // Создаем список треков. Ссылки не должны повторяться,
  // чтобы не загружать одну и ту же песню несколько раз
  let tracks = new Set();

  questions.forEach((question) => {
    if (question.src) {
      tracks.add(question.src);
    } else {
      const answers = question.answers;
      for (const i in answers) {
        if (answers.hasOwnProperty(i)) {
          tracks.add(answers[i].track.src);
        }
      }
    }
  });

  // Когда все треки загрузятся, возвращаем первоначальный список вопросов
  return Promise.all([...tracks].map((url) => loadAudio(url)))
    .then(() => questions);
};

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then((data) => adaptServerData(data))
      .then((questions) => loadAllAudio(questions))
      .catch(Application.showError);
  }

  // Этот метод вызывается после сохранения результата игрока,
  // поэтому ответ никогда не должен быть пустым и 404 это ошибка
  static loadStatistics() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`)
      .then(checkStatus)
      .then(toJSON)
      .then((statistics) => statistics.map((it) => it.points))
      .catch(Application.showError);
  }

  static saveData(data) {
    data = Object.assign({}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings)
      .then(checkStatus)
      .catch(Application.showError);
  }

}