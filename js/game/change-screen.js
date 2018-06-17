/**
 * Переключает текущий экран.
 * @param {Node} screen Экран, который нужно отобразить.
 */
const changeScreen = (screen) => {
  const currentScreen = document.querySelector(`section.main`);
  document.querySelector(`div.app`).replaceChild(screen, currentScreen);
};

export default changeScreen;
