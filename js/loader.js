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

// const loadAudio = (url) => {
//   return new Promise((onLoad, onError) => {
//     const audio = new Audio();
//     audio.onload = () => onLoad(audio);
//     audio.onerror = () => onError(`Не удалось загрузить аудиофайл: ${url}`);
//     audio.src = url;
//   });
// };

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => adaptServerData(data))
      .catch(Application.showError);
    // .then((questions) => questions.map((question) => {
    //   if (question.src) {
    //     loadAudio(question.src);
    //   } else {
    //     const answers = question.answers;
    //     for (const i in answers) {
    //       if (answers.hasOwnProperty(i)) {
    //         loadAudio(answers[i].track.src);
    //       }
    //     }
    //   }
    // }))
    // .then((audioPromises) => {
    //   Promise.all(audioPromises)
    //     .then(() => console.log(`все загрузилось`))
    //     .catch(() => console.log(`не все зашгрузилось`));
    // });

  }
}
