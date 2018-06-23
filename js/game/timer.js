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
      if (this.timeLeft > 0) {
        this.timeLeft--;
        return true;
      }
      return false;
    }
  };
};
