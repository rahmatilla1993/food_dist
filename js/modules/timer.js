function timer(id, deadline) {
  //Set Clock

  function getRemainingTime(endtime) {
    const time = Date.parse(endtime) - Date.now(),
      days = Math.floor(time / (1000 * 60 * 60 * 24)),
      hours = Math.floor((time / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((time / (1000 * 60)) % 60),
      seconds = Math.floor((time / 1000) % 60);

    return {
      total: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) return `0${num}`;
    return num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      day = timer.querySelector("#days"),
      hour = timer.querySelector("#hours"),
      minute = timer.querySelector("#minutes"),
      second = timer.querySelector("#seconds"),
      timerInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const { total, days, hours, minutes, seconds } =
        getRemainingTime(endtime);

      if (total <= 0) {
        clearInterval(timerInterval);
      }

      day.textContent = getZero(days);
      hour.textContent = getZero(hours);
      minute.textContent = getZero(minutes);
      second.textContent = getZero(seconds);
    }
  }

  setClock(id, deadline);
}

export default timer;
