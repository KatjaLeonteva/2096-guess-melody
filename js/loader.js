import adaptServerData from "./data/data-adapter";
import Application from "./app";

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 2096;
const StatusCodes = {
  OK_MIN: 200,
  OK_MAX: 300
};

const checkStatus = (response, errorText) => {
  if (response.status >= StatusCodes.OK_MIN && response.status < StatusCodes.OK_MAX) {
    return response;
  }

  throw new Error(`${errorText} Ошибка: ${response.status} ${response.statusText}`);
};

const toJSON = (response) => response.json();

const loadAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = src;
    audio.preload = `none`;
    audio.load();
    audio.oncanplaythrough = () => resolve([audio.src, audio]);
    audio.onerror = () => reject(new Error(`Не удалось загрузить аудиофайл.`));
  });
};

const loadAllAudio = (questions) => {
  // Создаем список треков. Ссылки не должны повторяться,
  // чтобы не загружать одну и ту же песню несколько раз

  const audiosSrc = questions.reduce((set, question) => {
    if (question.src) {
      set.add(question.src);
    } else {
      const answers = question.answers;
      for (const i in answers) {
        if (answers.hasOwnProperty(i)) {
          set.add(answers[i].track.src);
        }
      }
    }
    return set;
  }, new Set());

  // Когда все треки загрузятся, возвращаем первоначальный список вопросов
  // и мапку, из которой будем брать элементы аудио по src
  return Promise.all([...audiosSrc].map((src) => loadAudio(src)))
    .then((audios) => {
      return {questions, audiosMap: new Map(audios)};
    });
};

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then((response) => checkStatus(response, `Не удалось загрузить вопросы.`))
      .then(toJSON)
      .then((data) => adaptServerData(data))
      .then((questions) => loadAllAudio(questions))
      .catch(Application.showError);
  }

  // Этот метод вызывается после сохранения результата игрока,
  // поэтому ответ никогда не должен быть пустым и 404 это ошибка
  static loadStatistics() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`)
      .then((response) => checkStatus(response, `Не удалось загрузить статистику.`))
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
      .then((response) => checkStatus(response, `Не удалось сохранить результат.`))
      .catch(Application.showError);
  }

}
