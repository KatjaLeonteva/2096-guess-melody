export const createTimer = (seconds) => {
  if (!Number.isInteger(seconds)) {
    throw new Error(`Time should not be non integer value`);
  }

  if (seconds < 0) {
    throw new Error(`Time should not be negative value`);
  }

  return {
    timeLeft: seconds,
    tick() {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        return true;
      } else {
        return false;
      }
    }
  };
};
