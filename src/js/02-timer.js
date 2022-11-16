import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDateUnix = selectedDates[0].getTime();
    let id = null;

    if (Date.now() > selectedDateUnix) {
      Notiflix.Notify.failure('Please choose a date in the future');

      buttonStartTimer.disabled = true;
      return;
    } else {
      buttonStartTimer.disabled = false;
    }
    // console.log(selectedDates[0]);
  },
};

const inputDataEl = document.querySelector('#datetime-picker');
flatpickr(inputDataEl, options);
const buttonStartTimer = document.querySelector('button[data-start]');
buttonStartTimer.addEventListener('click', () => {
  const timer = {
    timerDeadline: new Date(inputDataEl.value),
    intervalId: null,
    rootSelector: document.querySelector('.timer'),

    start() {
      this.intervalId = setInterval(() => {
        const ms = this.timerDeadline - Date.now();

        if (ms <= 0) {
          this.stop();

          return;
        }

        const { days, hours, minutes, seconds } = this.convertMs(ms);

        this.rootSelector.querySelector('[data-days]').textContent =
          this.addLeadingZero(days);
        this.rootSelector.querySelector('[data-hours]').textContent =
          this.addLeadingZero(hours);
        this.rootSelector.querySelector('[data-minutes]').textContent =
          this.addLeadingZero(minutes);
        this.rootSelector.querySelector('[data-seconds]').textContent =
          this.addLeadingZero(seconds);
      }, 1000);
    },

    stop() {
      clearInterval(this.intervalId);
    },

    convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    },

    addLeadingZero(value) {
      return String(value).padStart(2, 0);
    },
  };
  timer.start();
});

// console.log(inputDataEl);
